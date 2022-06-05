<template>
  <div class="hello">
    <input
      id="imageFile"
      name="imageFile"
      type="file"
      class="imageFile"
      accept="image/*"
      @change="getAvatar($event)"
    />
    <button type="button" @click="resizeImage">Save</button>
    <br />
    <img src="" id="preview" />
    <img src="" id="output" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarFile: ``,
      croppedAvatar: ``,
      accountId: ``,
    };
  },
  mounted() {
    this.accountId = this.$store.state.user.accountId;
  },
  methods: {
    getAvatar(event) {
      let files = event.target.files;
      let file = files[0];
      this.avatarFile = file;
      if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("preview").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
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

      return new Blob([ia], { type: mimeString });
    },
    uploadImage(asset) {
      const formData = new FormData();
      formData.append(
        `meta`,
        JSON.stringify({
          fileType: `avatar`,
          description: `avatar`,
          relatedTo: `avatar`,
          relationId: this.accountId,
        })
      );
      formData.append("asset[]", asset);
      this.$store.dispatch(`UPLOAD`, formData);
    },
    resizeImage() {
      let file = this.avatarFile;
      if (file) {
        let reader = new FileReader();

        reader.onload = (e) => {
          let img = document.createElement("img");
          img.src = e.target.result;
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0);

          const MAX_WIDTH = 125;
          const MAX_HEIGHT = 125;

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;

          ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          let dataurl = canvas.toDataURL(file);

          let asset = this.dataURItoBlob(dataurl);
          this.uploadImage(asset);
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hello {
  width: 100%;
  height: 100%;
  background-color: red;
  outline: solid 5px blue;
  z-index: 3;
}
.user {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  border: 3px solid #2e7d32;
  position: relative;
}
.profile-img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.icon {
  position: absolute;
  top: 10px;
  right: 0;
  background: #e2e2e2;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  text-align: center;
  color: #0000ff;
  cursor: pointer;
}
</style>