--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: board_lists; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.board_lists (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "boardId" uuid NOT NULL
);


ALTER TABLE public.board_lists OWNER TO admin;

--
-- Name: boards; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.boards (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    workspace_id uuid NOT NULL,
    "isActived" boolean DEFAULT true
);


ALTER TABLE public.boards OWNER TO admin;

--
-- Name: card_logs; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.card_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    status character varying(100) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "cardId" uuid NOT NULL
);


ALTER TABLE public.card_logs OWNER TO admin;

--
-- Name: cards; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.cards (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    "boardListId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cards OWNER TO admin;

--
-- Name: collaborators; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.collaborators (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    users_id integer NOT NULL,
    boards_id uuid NOT NULL,
    role_id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.collaborators OWNER TO admin;

--
-- Name: collaborators_cards; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.collaborators_cards (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    collaborators_id uuid NOT NULL,
    cards_id uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.collaborators_cards OWNER TO admin;

--
-- Name: labels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.labels (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.labels OWNER TO admin;

--
-- Name: TABLE labels; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.labels IS '(por definir)';


--
-- Name: roles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "isActived" boolean DEFAULT true,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.roles OWNER TO admin;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO admin;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    "lastName" character varying(100),
    "phoneNumber" character varying(20),
    "isVerified" boolean DEFAULT false,
    "isActived" boolean DEFAULT true,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: workspaces; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.workspaces (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    "ownerId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "isActived" boolean DEFAULT true
);


ALTER TABLE public.workspaces OWNER TO admin;

--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: board_lists; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.board_lists (id, name, "createdAt", "boardId") FROM stdin;
\.


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.boards (id, name, description, "createdAt", workspace_id, "isActived") FROM stdin;
\.


--
-- Data for Name: card_logs; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.card_logs (id, status, "createdAt", "cardId") FROM stdin;
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.cards (id, title, description, "boardListId", "createdAt") FROM stdin;
\.


--
-- Data for Name: collaborators; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.collaborators (id, users_id, boards_id, role_id, "createdAt") FROM stdin;
\.


--
-- Data for Name: collaborators_cards; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.collaborators_cards (id, collaborators_id, cards_id, "createdAt") FROM stdin;
\.


--
-- Data for Name: labels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.labels (id, name) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.roles (id, name, "isActived", "createdAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, email, password, name, "lastName", "phoneNumber", "isVerified", "isActived", "createdAt") FROM stdin;
\.


--
-- Data for Name: workspaces; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.workspaces (id, name, description, "ownerId", "createdAt", "isActived") FROM stdin;
\.


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: board_lists board_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.board_lists
    ADD CONSTRAINT board_lists_pkey PRIMARY KEY (id);


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: card_logs card_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.card_logs
    ADD CONSTRAINT card_logs_pkey PRIMARY KEY (id);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: collaborators_cards collaborators_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.collaborators_cards
    ADD CONSTRAINT collaborators_cards_pkey PRIMARY KEY (id);


--
-- Name: collaborators collaborators_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.collaborators
    ADD CONSTRAINT collaborators_pkey PRIMARY KEY (id);


--
-- Name: labels labels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: workspaces workspaces_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.workspaces
    ADD CONSTRAINT workspaces_pkey PRIMARY KEY (id);


--
-- Name: collaborators fk_board; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.collaborators
    ADD CONSTRAINT fk_board FOREIGN KEY (boards_id) REFERENCES public.boards(id) ON DELETE CASCADE;


--
-- Name: board_lists fk_board; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.board_lists
    ADD CONSTRAINT fk_board FOREIGN KEY ("boardId") REFERENCES public.boards(id) ON DELETE CASCADE;


--
-- Name: cards fk_board_list; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT fk_board_list FOREIGN KEY ("boardListId") REFERENCES public.board_lists(id) ON DELETE CASCADE;


--
-- Name: collaborators_cards fk_card; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.collaborators_cards
    ADD CONSTRAINT fk_card FOREIGN KEY (cards_id) REFERENCES public.cards(id) ON DELETE CASCADE;


--
-- Name: card_logs fk_card; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.card_logs
    ADD CONSTRAINT fk_card FOREIGN KEY ("cardId") REFERENCES public.cards(id) ON DELETE CASCADE;


--
-- Name: collaborators_cards fk_collaborator; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.collaborators_cards
    ADD CONSTRAINT fk_collaborator FOREIGN KEY (collaborators_id) REFERENCES public.collaborators(id) ON DELETE CASCADE;


--
-- Name: workspaces fk_owner; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.workspaces
    ADD CONSTRAINT fk_owner FOREIGN KEY ("ownerId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: collaborators fk_role; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.collaborators
    ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: collaborators fk_user; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.collaborators
    ADD CONSTRAINT fk_user FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: boards fk_workspace; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT fk_workspace FOREIGN KEY (workspace_id) REFERENCES public.workspaces(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

