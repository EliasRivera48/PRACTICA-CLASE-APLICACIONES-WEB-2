CREATE TABLE "Control" (
    "id" SERIAL NOT NULL,
    "activo_tecnologico" string,

    CONSTRAINT "Control_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Control_identificacion_key" ON "Control"("identificacion");