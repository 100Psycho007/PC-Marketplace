-- CreateTable
CREATE TABLE "Technician" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "experience" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "services" TEXT[],
    "description" TEXT NOT NULL,
    "availability" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Technician_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technician_userId_key" ON "Technician"("userId");

-- AddForeignKey
ALTER TABLE "Technician" ADD CONSTRAINT "Technician_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
