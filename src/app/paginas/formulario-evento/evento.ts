export interface Eventos {
    evento_ID: number
    nome_evento: string
    descricao: string
    data_criacao: Date
    endereco: string
    preco_ingresso: string
    tipo_evento: string
    status: boolean
    data_evento: Date
    image?: string | ArrayBuffer
}
