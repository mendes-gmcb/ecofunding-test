-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('RENEW_ENERGY', 'ENVIRONMENTAL_CONSERVATION', 'SUSTAINABLE_AGRICULTURE', 'WASTE_MANAGEMENT', 'REFORESTATION', 'URBAN_MOBILITY', 'BASIC_SANITATION', 'ENVIRONMENTAL_EDUCATION', 'OTHERS');

-- CreateEnum
CREATE TYPE "InvestmentModality" AS ENUM ('DEBT', 'EQUITY', 'HYBRID', 'ROYALTIES', 'CARBON_CREDIT');

-- CreateEnum
CREATE TYPE "ProjectInvestmentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "ProjectCategory" NOT NULL,
    "state" TEXT NOT NULL,
    "environmental_impact" TEXT,
    "social_impact" TEXT,
    "carbon_reduction" DECIMAL(10,2) NOT NULL,
    "modality" "InvestmentModality" NOT NULL,
    "target_irr" DECIMAL(10,2) NOT NULL,
    "total_capture_volume" DECIMAL(15,2) NOT NULL,
    "payment_projected_period" INTEGER NOT NULL,
    "payment_period_unit" TEXT NOT NULL,
    "return_period" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "documents_verified" BOOLEAN NOT NULL DEFAULT false,
    "designer_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectDocument" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "document_type" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectInvestment" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "investor_id" TEXT NOT NULL,
    "investment_amount" MONEY NOT NULL,
    "investment_date" TIMESTAMP(3) NOT NULL,
    "status" "ProjectInvestmentStatus" NOT NULL,

    CONSTRAINT "ProjectInvestment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectReport" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "designer_id" TEXT NOT NULL,
    "report_date" TIMESTAMP(3) NOT NULL,
    "current_stage" TEXT NOT NULL,
    "milestones_achieved" TEXT NOT NULL,
    "financial_progress" DECIMAL(5,2) NOT NULL,
    "environmental_progress" DECIMAL(5,2) NOT NULL,
    "report_file_path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_designer_id_fkey" FOREIGN KEY ("designer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDocument" ADD CONSTRAINT "ProjectDocument_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInvestment" ADD CONSTRAINT "ProjectInvestment_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInvestment" ADD CONSTRAINT "ProjectInvestment_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectReport" ADD CONSTRAINT "ProjectReport_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectReport" ADD CONSTRAINT "ProjectReport_designer_id_fkey" FOREIGN KEY ("designer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
