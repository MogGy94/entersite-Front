import React, { useContext, useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles_DocumentRegister';
import { ContextPDFValidator } from '../../../views/PDFValidatorView/ContextPDFValidator';

const DocumentRegister = (props) => {
    const classes = useStyles();
    const { positionCss } = props
    const { actualDocument,
        actualDocumentRegistro,
        actualDocumentMetadata } = useContext(ContextPDFValidator);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (actualDocumentRegistro) {
            setLoading(false)
        }
    }, [actualDocumentRegistro])

    return (
        <div className={`${positionCss}`}>
            {/*  <RegisterCard loading={loading}/> */}
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    {
                        loading ?
                            <>loading</> :
                            <RegisterCardContent
                                {...{ ...actualDocumentRegistro, actualDocument }}
                                campos={Object.keys(actualDocumentMetadata).length}
                            />
                    }
                </CardContent>
            </Card>
        </div>
    )
}

const RegisterCardContent = (props) => {
    const classes = useStyles();
    const {
        actualDocument,
        nombre_documento,
        tipo_documento,
        fecha_procesado,
        campos } = props;
    /* console.log(props); */
    console.log();
    return (
        <>
            <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom>
                {`${actualDocument} : ${nombre_documento}`}
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
                {tipo_documento}
            </Typography>

            <Typography variant="body2" component="p">
                {fecha_procesado}
            </Typography>

            <Typography variant="body2" component="p">
                {campos}
            </Typography>
        </>
    )
}

RegisterCardContent.defaultProps = {
    tipo_documento: "Sin Tipo",
    nombre_documento: "Sin Nombre",
    fecha_procesado: "Sin Fecha",
    /*  campos: "0" */
}

export default DocumentRegister;