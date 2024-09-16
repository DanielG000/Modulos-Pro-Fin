ALTER TABLE "answer" ADD CONSTRAINT answer_activity_id_activity_activity_id FOREIGN KEY (activity_id) REFERENCES activity(activity_id);

CREATE SEQUENCE public.user_id_seq
    AS INTEGER
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);

CREATE SEQUENCE public.answer_id_seq
    AS INTEGER
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.answer_id_seq OWNED BY public."answer".id;


ALTER TABLE ONLY public."answer" ALTER COLUMN id SET DEFAULT nextval('public.answer_id_seq'::regclass);