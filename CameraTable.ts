import { RoverPhoto } from "./RoverPhoto"

export interface CameraTable{
    ALL : RoverPhoto[];
    FHAZ : RoverPhoto[];
    RHAZ : RoverPhoto[];
    MAST : RoverPhoto[];
    CHEMCAM: RoverPhoto[];	
    MAHLI: RoverPhoto[];
    MARDI: RoverPhoto[];
    NAVCAM: RoverPhoto[];
}