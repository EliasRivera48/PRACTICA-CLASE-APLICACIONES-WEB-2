CREATE TABLE "Departamento" (
    "id" SERIAL NOT NULL,
    "Departamento" int ,
    "Persona_encargada" text,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_identificacion_key" ON "Departamento"("identificacion");