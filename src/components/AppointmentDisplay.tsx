import { ListItemButton, ListItemText } from "@mui/material";
import Appointment from "../model/Appointment";

function AppointmentDisplay(props: any) {
    const appointment = props.appointment as Appointment;

    return <ListItemButton
        selected={props.selected}
        onClick={props.onClick}
    >
        <ListItemText
            primary={`${appointment.workTitle}`}
            secondary={`${appointment.date} ${appointment.startTime}`}
        />
    </ListItemButton>;
}

export default AppointmentDisplay;