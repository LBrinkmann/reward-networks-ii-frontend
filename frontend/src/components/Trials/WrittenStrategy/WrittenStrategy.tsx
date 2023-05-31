import React from "react";
import {Typography, Grid, Paper, TextField, Button} from "@mui/material";

interface WrittenStrategyInterface {
    endTrial: (data: any) => void;
    type?: "start" | "end";
}


const WrittenStrategy: React.FC<WrittenStrategyInterface> = ({endTrial, type = "end"}) => {
    const [writtenStrategy, setWrittenStrategy] = React.useState<string>("");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 200) setWrittenStrategy(event.target.value)
    }

    const onClickContinueHandler = () => {
        endTrial({strategy: writtenStrategy});
    }

    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 550,
                flexGrow: 1
            }}
        >
            <Grid sx={{flexGrow: 1}} direction="column" container spacing={4}>
                <Grid item style={{textAlign: "center"}}>
                    <Typography variant="h5" component="div">
                        {type === "start" ?
                            "Please think about how you approached the task and write down the strategy you used in trying to maximize points." :
                            "Please write down your strategy in solving the task."
                        }
                    </Typography>
                </Grid>
                <Grid item style={{margin: 8}}>
                    <TextField
                        multiline
                        fullWidth
                        margin="normal"
                        rows={6}
                        helperText={type == "start" ? "Please enter between 20 and 200 characters" : "Please enter between 20 and 200 characters"}
                        value={writtenStrategy}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item style={{textAlign: "center"}}>
                    {writtenStrategy.length < (type == "start" ? 20 : 20) ? (
                        <Button variant="contained" color="primary" disabled>Continue</Button>
                    ) : (
                        <Button onClick={onClickContinueHandler} variant="contained" color="primary">Continue</Button>
                    )}
                </Grid>

            </Grid>
        </Paper>
    );
};


export default WrittenStrategy;