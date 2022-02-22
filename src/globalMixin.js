const dayjs = require("dayjs");

export default {
    methods: {
        getTimeStamp(date) {
            let myDate = date;
            myDate = myDate.split("-");
            const timestamp = +new Date(
                Date.UTC(myDate[0], myDate[1] - 1, myDate[2])
            ).getTime();
            return timestamp;
        },
        getDate(date) {
            return dayjs(date).format("MMMM D, YYYY h:mm A");
        },
        dataURItoBlob(dataURI) {
            let byteString;
            if (dataURI.split(",")[0].indexOf("base64") >= 0)
                byteString = atob(dataURI.split(",")[1]);
            else byteString = unescape(dataURI.split(",")[1]);

            let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

            let ia = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {
                type: mimeString
            });
        },
    }
}