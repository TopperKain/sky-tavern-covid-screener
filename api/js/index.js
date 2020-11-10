Vue.createApp({
    data() {
      return {
        symptomsRadio: undefined,
        closeContactRadio: undefined,
        resultMessage: "",
        submitMessage: "",
        picked: ''
      }
    },
    methods: {
      clickSubmit() {
        const urlParams = new URLSearchParams(location.search);
        const personId = urlParams.get("personId");
        const dayId = urlParams.get("dayId");
        const msg = {
          "personId": personId,
          "dayId": dayId,
          "closeContact": this.closeContactRadio,
          "symptoms": this.symptomsRadio
        };

        if (this.closeContactRadio === "No"
          && this.symptomsRadio === "No") {
          this.resultMessage = "Thank you for responding, see you on the snow!"
        }
        else {
          this.resultMessage = "Bummer! Sorry to hear that, but given how closely we work with you and your kids, we need you to stay home this week."
        }

        let requestOpts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(msg)
        };

        let response = fetch('/api/SurveySubmit', requestOpts);
        response.then(resp => {
          if (resp.status === 200) {
            this.submitMessage = "Successfully submitted screener";
          }
          else {
            this.submitMessage = "Issue submitting screener. Please try again. If you continue to have issues please do a screening at the mountain."
          }
        })
      }
    }
  }).mount('#v-form-mountpoint')
