--
-- PostgreSQL database dump
--

\restrict Ui9dqp7ihwDCmTtsca6hc8011EyeqntbrQkNnYXQwHjdYVWd6so6Nl0n6dcjqCF

-- Dumped from database version 17.11 (Debian 17.11-1.pgdg13+2)
-- Dumped by pg_dump version 17.11 (Debian 17.11-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."Stocks" DROP CONSTRAINT IF EXISTS "FK_Stocks_Products_ProductCode";
ALTER TABLE IF EXISTS ONLY public."__EFMigrationsHistory" DROP CONSTRAINT IF EXISTS "PK___EFMigrationsHistory";
ALTER TABLE IF EXISTS ONLY public."Stocks" DROP CONSTRAINT IF EXISTS "PK_Stocks";
ALTER TABLE IF EXISTS ONLY public."Products" DROP CONSTRAINT IF EXISTS "PK_Products";
DROP TABLE IF EXISTS public."__EFMigrationsHistory";
DROP TABLE IF EXISTS public."Stocks";
DROP TABLE IF EXISTS public."Products";
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Products" (
    "Name" text NOT NULL,
    "ProductCode" text DEFAULT ''::text NOT NULL,
    "UnitPrice" numeric(10,2) DEFAULT 0.0 NOT NULL
);


--
-- Name: Stocks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Stocks" (
    "ProductCode" text NOT NULL,
    "Quantity" integer NOT NULL
);


--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


--
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Products" ("Name", "ProductCode", "UnitPrice") FROM stdin;
Coca-Cola	P001	20.00
Pepsi	P002	20.00
น้ำเปล่า	P003	10.00
ชาเขียว	P004	25.00
กาแฟกระป๋อง	P005	18.00
นมสด	P006	22.00
ขนมปัง	P007	35.00
บะหมี่กึ่งสำเร็จรูป	P008	8.00
มันฝรั่งทอด	P009	30.00
ช็อกโกแลต	P010	45.00
\.


--
-- Data for Name: Stocks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Stocks" ("ProductCode", "Quantity") FROM stdin;
P001	100
P002	80
P003	150
P005	45
P006	30
P008	200
P009	40
P010	0
P004	2
P007	24
\.


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20261019035411_InitialCreate	10.0.13
20261019035750_AddProductsAndStocks	10.0.13
\.


--
-- Name: Products PK_Products; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "PK_Products" PRIMARY KEY ("ProductCode");


--
-- Name: Stocks PK_Stocks; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Stocks"
    ADD CONSTRAINT "PK_Stocks" PRIMARY KEY ("ProductCode");


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: Stocks FK_Stocks_Products_ProductCode; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Stocks"
    ADD CONSTRAINT "FK_Stocks_Products_ProductCode" FOREIGN KEY ("ProductCode") REFERENCES public."Products"("ProductCode") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Ui9dqp7ihwDCmTtsca6hc8011EyeqntbrQkNnYXQwHjdYVWd6so6Nl0n6dcjqCF

