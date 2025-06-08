export interface Eventos {
    evento_ID: string
    nome_evento: string
    descricao: string
    data_criacao: Date
    endereco: string
    preco_ingresso: string
    tipo_evento: string
    status: boolean
    data_evento: Date
    maioridade: Boolean
    eventoUrl: string
    image?: string | ArrayBuffer
}
