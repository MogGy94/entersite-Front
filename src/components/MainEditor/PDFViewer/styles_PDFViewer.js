export const styles = {
  root: {
    justifySelf: "center",
    height: "calc(100% - 10px)",
    width: "calc(100% - 20px)",
  },
  content: {
    display: "grid",
    placeItems: "center",
    height: "calc(100%)",
    width: "100%",
    overflow: "auto",

  },
  container: {
    height: "100%"
  },
  toolBar: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "max-content 1fr repeat(3,max-content)",
    //margin: "30px 0",
  },
  document: {
    display: "grid",
    placeItems: "center",
  },
  page: {
    height: "100%",
    /*   overflow: "auto", */
  },
};

