

export const styles = {
    root: {
        height: "calc(100% - 24px)",
        margin: "10px",
        padding: "0 0 5% 0"
    },
    content: {
        height: "70%",
        display: "grid",
    },
    form: {
        width: "100%",
        margin: "10px 0",
        display: "grid",
        gridTemplateColumns: "max-content 1fr max-content",
        placeItems: "center",
        padding: "7px",
        borderRadius: "5px",
        transition: "0.5s ease-in",
        '&:nth-child(2n + 1)': {
            background: "#bcbcbd",
        },
        '&:nth-child(2n)': {
            background: "#e0e0e0",
        }
    },
    inputContainer: {
        overflow: "auto",
    },
    index: {
        display: "grid",
        placeItems: "center",
        color: "white",
        margin: 0,
        width: "30px",
        height: "30px",
        fontSize: ".8em",
        background: "var(--my-Color)",
        marginRight: "1em",
        borderRadius: "50%"
    },
    submit: {
        display: "grid",
        gridTemplate: "repeat(3 ,1fr) / 1fr 1fr",
        margin: "10px",
        gap: "0 10px"

    },
    inputObcevation: {
        marginBottom: "5px",
        gridRow: " 1 / span 2",
        gridColumn: "1 /span 2"
    },
    input: {
        background: "#f7d0d0 !important"
    }
};

export const deepStyles = {
    root: {
        '& .MuiOutlinedInput-input': {
            padding: "8px",
            paddingTop: "16px",
        }
    }
}