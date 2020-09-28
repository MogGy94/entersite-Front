import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { Button, IconButton, Tooltip } from '@material-ui/core';

import NotInterested from '@material-ui/icons/NotInterested';
import PanoramaFishEye from '@material-ui/icons/PanoramaFishEye';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import { styles, deepStyles } from './styles_MetadataValidator';
import { ContextPDFValidator } from '../../../views/PDFValidatorView/ContextPDFValidator';

const useStyles = makeStyles(styles);
const TextFieldDeepStyles = withStyles(deepStyles)(TextField);

const MetadataValidator = (props) => {
    const { positionCss } = props;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(true);

    const { actualDocumentMetadata } = useContext(ContextPDFValidator);

    useEffect(() => {
        if (actualDocumentMetadata) {
            setLoading(false)
        }
    }, [actualDocumentMetadata])

    return (
        <div className={`${positionCss}`}>
            <Card className={classes.root}>
                <CardContent className={classes.content}>

                    <Typography variant="h5" component="h1">
                        {" Metadata Extraida"}
                    </Typography>

                    {
                        loading ?
                            <>loading</> :
                            <>
                                <MetadataInputsSet fieldsSet={actualDocumentMetadata} />
                            </>
                    }
                </CardContent>
                <CardActions className={classes.submit}>
                    <TextFieldDeepStyles
                        className={classes.inputObcevation}
                        id="outlined-basic"
                        label={"Obcervaciones"}
                        variant="outlined"
                        fullWidth
                        multiline
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">
                        APRUEBA
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary">
                        RECHAZA
                    </Button>
                </CardActions>
            </Card>
            {/*  <SimpleModal /> */}
        </div>
    )
}


function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render

    /* const { open, setOpen } = props; */
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
            <SimpleModal />
        </div>
    );

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open Modal
      </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

const MetadataInputsSet = (props) => {
    const classes = useStyles();
    const { fieldsSet } = props;

    const inputs = Object.keys(fieldsSet).map((fieldName, index) => {

        return (
            <MetadataInput
                key={`field-${index}`}
                {...{ fieldName, index }}
            />
        )

    })
    return (
        <div className={classes.inputContainer}>
            {inputs}
        </div>
    )
}


MetadataInputsSet.defaultProps = {
    fieldsSet: { name: "EMPTY OBJECT" }
}


const MetadataInput = (props) => {
    const classes = useStyles();
    const { actualDocumentMetadata } = useContext(ContextPDFValidator);
    const { fieldName, index } = props

    const [blockField, setBlockField] = useState(false);
    const [toolTipTex, setToolTipTex] = useState("Bloquear");


    const handleBlockField = () => {
        if (blockField) {
            setBlockField(false);
            setToolTipTex("Bloquear");
        } else {
            setBlockField(true);
            setToolTipTex("Desbloquear");
        }

    }

    return (
        <form
            className={blockField ?
                clsx([classes.form, classes.input]) :
                classes.form}
            autoComplete="off"
            noValidate
        >
            <Typography className={classes.index} color="textPrimary" gutterBottom>
                {index}
            </Typography>

            <TextFieldDeepStyles
                /* id="outlined-basic" */
                /*  className={`${classes.input}`} */
                label={fieldName}
                defaultValue={actualDocumentMetadata[fieldName]}
                variant="outlined"
                fullWidth
            />
            <Tooltip title={toolTipTex}>
                <IconButton
                    size="small"
                    onClick={() => handleBlockField()}
                >
                    {
                        blockField ?
                            <PanoramaFishEye /> :
                            <NotInterested />

                    }
                </IconButton>
            </Tooltip>
        </form>
    )
}


export default MetadataValidator;