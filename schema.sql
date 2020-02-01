--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: yanger1
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    message text
);


ALTER TABLE public.messages OWNER TO yanger1;

--
-- Name: messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: yanger1
--

CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_message_id_seq OWNER TO yanger1;

--
-- Name: messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yanger1
--

ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;


--
-- Name: user_info; Type: TABLE; Schema: public; Owner: yanger1
--

CREATE TABLE public.user_info (
    guid character varying(64) NOT NULL,
    validated boolean,
    username character varying(64),
    zip character varying(7),
    geom public.geography(Point,4326),
    show_username character varying(64)
);


ALTER TABLE public.user_info OWNER TO yanger1;

--
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: yanger1
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: yanger1
--

COPY public.messages (message_id, message) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: yanger1
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: user_info; Type: TABLE DATA; Schema: public; Owner: yanger1
--

COPY public.user_info (guid, validated, username, zip, geom, show_username) FROM stdin;
\.


--
-- Name: messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yanger1
--

SELECT pg_catalog.setval('public.messages_message_id_seq', 1, false);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: yanger1
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: public; Owner: yanger1
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (guid);


--
-- PostgreSQL database dump complete
--

