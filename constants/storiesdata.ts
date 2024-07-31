export interface StoriesType {
    iD: number;
    titleee: string;
    title:string;
    image: string;
    audio: string;
}

export const STORIES_DATA: StoriesType[] = [
    {
        iD: 1,
        titleee: "Siddhartha et le cygne",
        title:"7min49",
        image: "fff.jpg",
        audio: "siddhartha.mp3",
    },
    {
        iD: 2,
        titleee: "Le roi malheureux",
        title:"9min50",
        image: "fff.jpg",
        audio: "Leroimalheureux.mp3",
    },
 
    {
        iD: 3,
        titleee: " Le génie menteur",
        title:"7min50",
        image: "fff.jpg",
        audio: "Legéniementeur.mp3",
    },
    {
        iD: 4,
        titleee: "La mouche qui voulait être un papillon ",
        title:"7min26",
        image: "fff.jpg",
        audio: "Lamouche.mp3",
    },
];

export const AUDIO_FILESSS: { [key: string]: any } = {
    "siddhartha.mp3": require("@/assets/audiostories/siddhartha.mp3"),
    "Leroimalheureux.mp3": require("@/assets/audiostories/Leroimalheureux.mp3"),
    "Legéniementeur.mp3": require("@/assets/audiostories/Legéniementeur.mp3"),
    "Lamouche.mp3": require("@/assets/audiostories/Lamouche.mp3"),
   
};
