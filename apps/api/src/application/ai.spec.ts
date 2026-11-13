import { BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';

describe('CAUCE IA', () => {
  const repository:any={
    movement:{findMany:jest.fn().mockResolvedValue([]),aggregate:jest.fn().mockResolvedValue({_sum:{amount:null}})},
    contribution:{aggregate:jest.fn().mockResolvedValue({_sum:{amount:null}})},
    recurringPayment:{findMany:jest.fn().mockResolvedValue([])},
    budget:{findMany:jest.fn().mockResolvedValue([])},
    goal:{findMany:jest.fn().mockResolvedValue([])},
  };
  const app=new AppService(repository,new JwtService({secret:'test-secret'}));
  const envKey=process.env.GEMINI_API_KEY,envModel=process.env.GEMINI_MODEL;
  afterEach(()=>{jest.restoreAllMocks();if(envKey===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=envKey;if(envModel===undefined)delete process.env.GEMINI_MODEL;else process.env.GEMINI_MODEL=envModel;});

  it('requires explicit consent and an API key before contacting Gemini', async()=>{
    delete process.env.GEMINI_API_KEY;
    await expect(app.analyzeFinances('123',false)).rejects.toBeInstanceOf(BadRequestException);
    await expect(app.analyzeFinances('123',true)).rejects.toBeInstanceOf(ServiceUnavailableException);
  });

  it('uses Gemini structured JSON and returns a validated financial analysis', async()=>{
    process.env.GEMINI_API_KEY='test-only-key';
    process.env.GEMINI_MODEL='gemini-3.1-flash-lite';
    const analysis={summary:'Los datos disponibles son limitados.',patterns:[],recommendations:[],risk:{level:'LOW',explanation:'No se observa riesgo con los datos disponibles.',date:''}};
    const fetch=jest.spyOn(global,'fetch').mockResolvedValue({ok:true,json:async()=>({candidates:[{content:{parts:[{text:JSON.stringify(analysis)}]}}]})} as Response);
    await expect(app.analyzeFinances('123',true)).resolves.toEqual(analysis);
    const [,init]=fetch.mock.calls[0];
    const request=JSON.parse(String(init?.body));
    expect(fetch.mock.calls[0][0]).toContain('/models/gemini-3.1-flash-lite:generateContent');
    expect(request.generationConfig.responseMimeType).toBe('application/json');
    expect((init?.headers as Record<string,string>)['x-goog-api-key']).toBe('test-only-key');
    expect(JSON.stringify(request.contents)).not.toContain('123');
  });

  it('reports exhausted provider quota without exposing provider details', async()=>{
    process.env.GEMINI_API_KEY='test-only-key';
    jest.spyOn(global,'fetch').mockResolvedValue({ok:false,status:429} as Response);
    await expect(app.analyzeFinances('123',true)).rejects.toThrow('Gemini alcanzó el límite gratuito temporal.');
  });
});
