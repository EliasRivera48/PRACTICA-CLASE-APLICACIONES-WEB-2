CREATE TABLE "Control" (
    "id" SERIAL NOT NULL,
     "ID_Departamento" int not NULL, 
     "Fecha_asignación" int, 
     "Persona_asignada" text, 
     "Tiempo_depreciación" int,

    CONSTRAINT "Control_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Control_identificacion_key" ON "Control"("identificacion");