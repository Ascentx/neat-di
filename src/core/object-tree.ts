export interface ObjectNode {
    children: {
        [key: string]: ObjectNode
    },
    uuid: string,
    parentUuid: string,
    instance: any
}