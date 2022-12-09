export interface Info {
    title: string,
    image: string,
    id: string,
    desc: string,
    page: string,
}

export type ApiInfo = Omit<Info, 'id'>;
