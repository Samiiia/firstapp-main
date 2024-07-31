export interface SoundsType {
    ID: number;
    titlee: string;
    image: string;
    audio: string;
}

export const SOUNDS_DATA: SoundsType[] = [
    {
        ID: 1,
        titlee: "Birds",
        image: "son.jpg",
        audio: "birds.mp3",
    },
    {
        ID: 2,
        titlee: "Fire",
        image: "son.jpg",
        audio: "fire.mp3",
    },
    {
        ID: 3,
        titlee: "Night forest",
        image: "son.jpg",
        audio: "nightforest.mp3",
    },
    {
        ID: 4,
        titlee: "Rain",
        image: "son.jpg",
        audio: "rain.mp3",
    },
    {
        ID: 5,
        titlee: "Storm",
        image: "son.jpg",
        audio: "storm.mp3",
    },
    {
        ID: 6,
        titlee: "Waves and Birds",
        image: "son.jpg",
        audio: "wavesbirds.mp3",
    },
    {
        ID: 7,
        titlee: "Wind",
        image: "son.jpg",
        audio: "wind.mp3",
    },
    {
        ID: 8,
        titlee: "Wind chimes",
        image: "son.jpg",
        audio: "windchimes.mp3",
    },
];

export const AUDIO_FILESS: { [key: string]: any } = {
    "birds.mp3": require("@/assets/audios/birds.mp3"),
    "fire.mp3": require("@/assets/audios/fire.mp3"),
    "nightforest.mp3": require("@/assets/audios/nightforest.mp3"),
    "rain.mp3": require("@/assets/audios/rain.mp3"),
    "storm.mp3": require("@/assets/audios/storm.mp3"),
    "wavesbirds.mp3": require("@/assets/audios/wavesbirds.mp3"),
    "wind.mp3": require("@/assets/audios/wind.mp3"),
    "windchimes.mp3": require("@/assets/audios/windchimes.mp3"),
};
