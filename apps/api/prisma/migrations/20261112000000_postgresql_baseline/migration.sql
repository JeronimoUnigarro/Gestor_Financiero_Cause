-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('BUDGET_NEAR_LIMIT', 'BUDGET_EXCEEDED', 'RECURRING_PAYMENT_DUE', 'GOAL_COMPLETED', 'GOAL_DEADLINE');

-- CreateEnum
CREATE TYPE "PaymentFrequency" AS ENUM ('WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY');

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "phone" VARCHAR(30),
    "city" VARCHAR(100),
    "avatar_data" TEXT,
    "currency" CHAR(3) NOT NULL DEFAULT 'COP',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "name" VARCHAR(100) NOT NULL,
    "type" "MovementType" NOT NULL,
    "description" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_transactions" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,
    "type" "MovementType" NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "transaction_date" DATE NOT NULL,
    "description" VARCHAR(500),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "amount_limit" DECIMAL(15,2) NOT NULL,
    "period_start" DATE NOT NULL,
    "period_end" DATE NOT NULL,
    "alert_threshold" DECIMAL(5,2) NOT NULL DEFAULT 80.00,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "savings_goals" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(500),
    "target_amount" DECIMAL(15,2) NOT NULL,
    "target_date" DATE NOT NULL,
    "status" "GoalStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "savings_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal_contributions" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "goal_id" BIGINT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "contribution_date" DATE NOT NULL,
    "idempotency_key" VARCHAR(100),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goal_contributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "type" "AlertType" NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "entity_type" VARCHAR(50),
    "entity_id" BIGINT,
    "deduplication_key" VARCHAR(191) NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP(0),

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recurring_payments" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "next_payment_date" DATE NOT NULL,
    "frequency" "PaymentFrequency" NOT NULL DEFAULT 'MONTHLY',
    "reminder_days" INTEGER NOT NULL DEFAULT 3,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recurring_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_categories_type_active" ON "categories"("type", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "uq_categories_user_name_type" ON "categories"("user_id", "name", "type");

-- CreateIndex
CREATE INDEX "idx_transactions_user_date" ON "financial_transactions"("user_id", "transaction_date", "id");

-- CreateIndex
CREATE INDEX "idx_transactions_user_type_date" ON "financial_transactions"("user_id", "type", "transaction_date");

-- CreateIndex
CREATE INDEX "idx_transactions_category_date" ON "financial_transactions"("category_id", "transaction_date");

-- CreateIndex
CREATE INDEX "idx_budgets_category" ON "budgets"("category_id");

-- CreateIndex
CREATE INDEX "idx_budgets_user_period" ON "budgets"("user_id", "period_start", "period_end", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "uq_budgets_user_category_period" ON "budgets"("user_id", "category_id", "period_start", "period_end");

-- CreateIndex
CREATE INDEX "idx_goals_user_status_date" ON "savings_goals"("user_id", "status", "target_date");

-- CreateIndex
CREATE INDEX "idx_contributions_goal_date" ON "goal_contributions"("goal_id", "contribution_date", "id");

-- CreateIndex
CREATE INDEX "idx_contributions_user_date" ON "goal_contributions"("user_id", "contribution_date");

-- CreateIndex
CREATE UNIQUE INDEX "uq_contributions_idempotency" ON "goal_contributions"("user_id", "idempotency_key");

-- CreateIndex
CREATE INDEX "idx_alerts_user_read_date" ON "alerts"("user_id", "is_read", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_alerts_deduplication" ON "alerts"("user_id", "deduplication_key");

-- CreateIndex
CREATE INDEX "idx_recurring_category" ON "recurring_payments"("category_id");

-- CreateIndex
CREATE INDEX "idx_recurring_due" ON "recurring_payments"("is_active", "next_payment_date");

-- CreateIndex
CREATE INDEX "idx_recurring_user_due" ON "recurring_payments"("user_id", "is_active", "next_payment_date");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "fk_categories_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "financial_transactions" ADD CONSTRAINT "fk_transactions_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "financial_transactions" ADD CONSTRAINT "fk_transactions_category" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "fk_budgets_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "fk_budgets_category_pg" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "savings_goals" ADD CONSTRAINT "fk_goals_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "goal_contributions" ADD CONSTRAINT "fk_contributions_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "goal_contributions" ADD CONSTRAINT "fk_contributions_goal" FOREIGN KEY ("goal_id") REFERENCES "savings_goals"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "fk_alerts_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recurring_payments" ADD CONSTRAINT "fk_recurring_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recurring_payments" ADD CONSTRAINT "fk_recurring_category_pg" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

