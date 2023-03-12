import { ListItemButton, ListItemText } from "@mui/material";

function WorkDisplay(props: any) {
    return <ListItemButton
        selected={props.selected}
        onClick={props.onClick}
    >
        <ListItemText
            primary={`${props.work.title}${props.work.durationMinutes > 0 ? ' - ' + props.work.durationMinutes + ' perc' : ''}`}
            secondary={props.work.description}
        />
    </ListItemButton>;
}

export default WorkDisplay;