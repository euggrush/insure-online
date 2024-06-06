/* eslint-disable no-unused-vars */
const dayjs = require("dayjs");

export default {
    methods: {
        hideMenu() {
            const navbarCollapsible =
            document.body.querySelector("#navbarResponsive");
            navbarCollapsible.classList.remove("show");
        },
        shrinkNavbar() {
            var navbarShrink = function () {
                const navbarCollapsible = document.body.querySelector("#mainNav");
                let url = new URL(window.location.href);
                // console.log(url.hash);
                if (!navbarCollapsible) {
                    return;
                }
                if (window.scrollY === 0 || url.hash !== `#/` && url.hash !== `#/login` && url.hash !== `#/registration` && url.hash !== `#/reset-password` && url.hash !== `#/about-us`) {
                    navbarCollapsible.classList.remove("navbar-shrink");
                } else {

                    navbarCollapsible.classList.add("navbar-shrink");
                }
            };

            navbarShrink();

            document.addEventListener("scroll", navbarShrink);
            const navbarToggler = document.body.querySelector(".navbar-toggler");
            const responsiveNavItems = [].slice.call(
                document.querySelectorAll("#navbarResponsive .nav-link")
            );
            responsiveNavItems.map(function (responsiveNavItem) {
                responsiveNavItem.addEventListener("click", () => {
                    if (window.getComputedStyle(navbarToggler).display !== "none") {
                        navbarToggler.click();
                    }
                });
            });
        },
        geErrorMessage(err) {
            if (err.response) {
                // this.geErrorMessage(err.response, true);
                setTimeout(() => {
                    this.$store.commit(`SET_MODAL`, {
                        msg: `an unexpected error occurred, sorry for the inconvenience`,
                        isModal: true,
                    });
                }, 1000);
            } else if (err.request) {
                // this.geErrorMessage(err.request, true);
                setTimeout(() => {
                    this.$store.commit(`SET_MODAL`, {
                        msg: `an unexpected error occurred, sorry for the inconvenience`,
                        isModal: true,
                    });
                }, 1000);
            } else {
                setTimeout(() => {
                    this.$store.commit(`SET_MODAL`, {
                        msg: this.$store.state.general_errors.data.message ?? `an unexpected error occurred, sorry for the inconvenience`,
                        isModal: true,
                    });
                }, 1000);
            }
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
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
         lessThanOneHourAgo(date) {
            const HOUR = 1000 * 60 * 60 * 24;
            const anHourAgo = Date.now() - HOUR;
            return Date.parse(date) > anHourAgo
        },
        hideUnpaidOrder(order) {
            let show;
            const TWENTY_FOUR_HOURS = 86400000;
            let today = Date.now();
            let dayAgo = today - TWENTY_FOUR_HOURS;
            let orderDate = Date.parse(order.orderCreated);
            let orderStatus = order.paidBy;
            if (orderDate < dayAgo && orderStatus === ``) {
                show = false
            } else {
                show = true;
            }
            return show;
        },
        isTokenExpired(tokenExpiration) {
            let tokenTime = dayjs(tokenExpiration).valueOf();
            let currentTime = Date.now();
            if (tokenTime < currentTime) {
              return true;
            }
            return false;
          },
          unfixHeader() {
            let header = document.querySelector(`#mainNav`);
            header.classList.remove(`fixed-top`);
          },
          fixHeader() {
            let header = document.querySelector(`#mainNav`);
            header.classList.add(`fixed-top`);
          },
          enableTooltips() {
              let tooltipTriggerList = [].slice.call(
                  document.querySelectorAll('[data-bs-toggle="tooltip"]')
              );
              let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                  // eslint-disable-next-line no-undef
                  return new bootstrap.Tooltip(tooltipTriggerEl);
              });
          }
    }
}