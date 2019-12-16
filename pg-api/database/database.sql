-- Model Author: Vinicius França

-- object: public.sensor | type: TABLE --
-- DROP TABLE IF EXISTS public.sensor CASCADE;
CREATE TABLE public.sensor(
	id_sensor serial NOT NULL,
	ultima_medida double precision,
	localizacao varchar,
	id_tamanho integer NOT NULL,
	id_tipo integer NOT NULL,
	id_marca integer NOT NULL,
	id_bateria integer NOT NULL,
	CONSTRAINT pk_sensor PRIMARY KEY (id_sensor)

);
-- ddl-end --
ALTER TABLE public.sensor OWNER TO postgres;
-- ddl-end --

-- object: public.marca | type: TABLE --
-- DROP TABLE IF EXISTS public.marca CASCADE;
CREATE TABLE public.marca(
	id_marca serial NOT NULL,
	nm_marca varchar UNIQUE,
	CONSTRAINT pk_marca PRIMARY KEY (id_marca)

);
-- ddl-end --
ALTER TABLE public.marca OWNER TO postgres;
-- ddl-end --

-- object: public.tipo | type: TABLE --
-- DROP TABLE IF EXISTS public.tipo CASCADE;
CREATE TABLE public.tipo(
	id_tipo serial NOT NULL,
	nm_tipo varchar UNIQUE,
	CONSTRAINT pk_tipo PRIMARY KEY (id_tipo)

);
-- ddl-end --
ALTER TABLE public.tipo OWNER TO postgres;
-- ddl-end --

-- object: public.bateria | type: TABLE --
-- DROP TABLE IF EXISTS public.bateria CASCADE;
CREATE TABLE public.bateria(
	id_bateria serial NOT NULL,
	tensao double precision,
	CONSTRAINT pk_bateria PRIMARY KEY (id_bateria)

);
-- ddl-end --
ALTER TABLE public.bateria OWNER TO postgres;
-- ddl-end --

-- object: public.tamanho | type: TABLE --
-- DROP TABLE IF EXISTS public.tamanho CASCADE;
CREATE TABLE public.tamanho(
	id_tamanho serial NOT NULL,
	altura double precision,
	largura double precision,
	comprimento double precision,
	CONSTRAINT pk_tamanho PRIMARY KEY (id_tamanho)

);
-- ddl-end --
ALTER TABLE public.tamanho OWNER TO postgres;
-- ddl-end --

-- object: tamanho_fk | type: CONSTRAINT --
-- ALTER TABLE public.sensor DROP CONSTRAINT IF EXISTS tamanho_fk CASCADE;
ALTER TABLE public.sensor ADD CONSTRAINT tamanho_fk FOREIGN KEY (id_tamanho)
REFERENCES public.tamanho (id_tamanho) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: tipo_fk | type: CONSTRAINT --
-- ALTER TABLE public.sensor DROP CONSTRAINT IF EXISTS tipo_fk CASCADE;
ALTER TABLE public.sensor ADD CONSTRAINT tipo_fk FOREIGN KEY (id_tipo)
REFERENCES public.tipo (id_tipo) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: marca_fk | type: CONSTRAINT --
-- ALTER TABLE public.sensor DROP CONSTRAINT IF EXISTS marca_fk CASCADE;
ALTER TABLE public.sensor ADD CONSTRAINT marca_fk FOREIGN KEY (id_marca)
REFERENCES public.marca (id_marca) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: bateria_fk | type: CONSTRAINT --
-- ALTER TABLE public.sensor DROP CONSTRAINT IF EXISTS bateria_fk CASCADE;
ALTER TABLE public.sensor ADD CONSTRAINT bateria_fk FOREIGN KEY (id_bateria)
REFERENCES public.bateria (id_bateria) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

--#### INSERSOES PADRAO ####--
--BATERIA
INSERT INTO public.bateria (tensao) VALUES(3);
INSERT INTO public.bateria (tensao) VALUES(1.5);

--TAMANHO
INSERT INTO public.tamanho (altura, largura, comprimento)
VALUES(3, 3, 3); --tipo 1
INSERT INTO public.tamanho (altura, largura, comprimento)
VALUES(1, 2, 2); --tipo 2

--MARCA
INSERT INTO public.marca (nm_marca) VALUES('A1');
INSERT INTO public.marca (nm_marca) VALUES('B3');
INSERT INTO public.marca (nm_marca) VALUES('T10');

--TIPO
INSERT INTO public.tipo (nm_tipo) VALUES('Temperatura');
INSERT INTO public.tipo (nm_tipo) VALUES('Corrente Elétrica');
INSERT INTO public.tipo (nm_tipo) VALUES('Pressão');
INSERT INTO public.tipo (nm_tipo) VALUES('Intensidade Luminosa');
INSERT INTO public.tipo (nm_tipo) VALUES('Aceleração');
