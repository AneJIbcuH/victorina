export type Answer = {
    id: number,
    title: string,
    correct: boolean,
    image?: string
    imageSize?: number[],
    check?: boolean,
}

export type Question = {
    answers: Answer[],
    correctAnswers: boolean,
    description: string,
    id: number,
    title: string
}


