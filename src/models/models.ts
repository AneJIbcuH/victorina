export type Answer = {
    id: number,
    title: string,
    correct: boolean,
    image?: string
    imageSize?: number[]
}

export type Question = {
    answers: Answer[],
    correctAnswers: boolean,
    description: string,
    id: number,
    title: string
}


