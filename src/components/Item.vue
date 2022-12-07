<template>
  <div class="item" v-bind:class="{opened: store.fullPageItem, 'closing-disabled': closingIsDisabled}"
       v-on:click="closeItem">
    <div class="item-data" v-if="!store.shownItem.isOrder"
         v-on:mouseenter="closingIsDisabled = !closingIsDisabled" v-on:mouseleave="closingIsDisabled = !closingIsDisabled">
      <div class="img-container">
        <img v-bind:src="store.shownItem.img" v-bind:alt="store.shownItem.img" v-on:load="setImgLoadState">
      </div>
      <div class="text">
        <div class="name">{{store.shownItem.name}}</div>
        <div class="description">{{store.shownItem.desc}}</div>
        <div class="weight">{{store.shownItem.weight}}</div>
      </div>
      <div class="close-btn">
        <span class="material-symbols-outlined close" v-on:mouseenter="closingIsDisabled = !closingIsDisabled" v-on:mouseleave="closingIsDisabled = !closingIsDisabled"
              v-on:click="closeItem">
          close
        </span>
      </div>
    </div>
    <div class="item-data order-data" v-else
         v-on:mouseenter="closingIsDisabled = true" v-on:mouseleave="closingIsDisabled = true">
      <div class="user-data">
        <form class="form" novalidate="true" v-on:submit.prevent="submitForm" action="https://my-json-server.typicode.com/denvolk/restaurant-db/orders/" method="post">
          <div class="field user-name">
            <span class="material-symbols-rounded err fname" v-show="!isDisabled['fNameErr']">
              done
            </span>
            <div class="input-container">
              <!--              <input type="text" name="firstname" id="firstname"-->
              <!--                     v-model="form.firstName" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['first-name']" autofocus-->
              <!--              >-->
              <input type="text" name="firstname" id="firstname"
                     v-model="form.firstName" placeholder=" " autofocus
              >
              <label for="firstname">{{store.pageLanguages[currLang]['placeholders']['first-name']}}</label>
            </div>
            <span class="material-symbols-rounded err lname" v-show="!isDisabled['lNameErr']">
              done
            </span>
            <div class="input-container">
<!--              <input type="text" name="lastname" id="lastname"-->
<!--                     v-model="form.lastName" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['last-name']"-->
<!--              >-->
              <input type="text" name="lastname" id="lastname"
                     v-model="form.lastName" placeholder=" "
              >
              <label for="lastname">{{store.pageLanguages[currLang]['placeholders']['last-name']}}</label>
            </div>
          </div>
          <div class="field email">
            <span class="material-symbols-rounded err email-err" v-show="!isDisabled['emailErr']">
              done
            </span>
            <div class="input-container">
<!--              <input type="email" name="email" id="email"-->
<!--                     v-model="form.email" placeholder="example@gmail.com" autocomplete="on"-->
<!--              >-->
              <input type="email" name="email" id="email"
                     v-model="form.email" autocomplete="on" placeholder=" "
              >
              <label for="email">Email</label>
            </div>
          </div>
          <div class="field phone">
            <span class="material-symbols-rounded err phone-err" v-show="!isDisabled['phoneErr']">
              done
            </span>
            <div class="input-container">
<!--              <input type="text" name="phone" id="phone"-->
<!--                     v-model="form.phone" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['phone-mask']"-->
<!--              >-->
              <input type="text" name="phone" id="phone"
                     v-model="form.phone" placeholder=" "
              >
              <label for="phone">{{store.pageLanguages[currLang]['placeholders']['phone']}}</label>
            </div>
          </div>
          <div class="field address">
<!--            <span class="material-symbols-rounded err address-err" v-show="!isDisabled['addressErr']">-->
<!--              done-->
<!--            </span>-->
            <div class="input-container">
<!--              <textarea name="address" id="address" rows="2" cols="50"-->
<!--                        v-model="form.address" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['address']"-->
<!--              ></textarea>-->
              <textarea name="address" id="address" rows="2" cols="45"
                        v-bind:class="{addressCorrect: !isDisabled['addressErr']}" v-model="form.address" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['address']"
              ></textarea>
<!--              <label for="address">{{store.pageLanguages[currLang]['placeholders']['address']}}</label>-->
            </div>
          </div>
          <div class="field comment">
            <div class="input-container">
<!--              <textarea name="comment" id="comment" rows="5" cols="50"-->
<!--                        v-model="form.comment" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['comment']"-->
<!--              ></textarea>-->
              <textarea name="comment" id="comment" rows="3" cols="45"
                        v-model="form.comment" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['comment']"
              ></textarea>
<!--              <label for="comment">{{store.pageLanguages[currLang]['placeholders']['comment']}}</label>-->
            </div>
          </div>
          <div class="field submit">
            <button v-bind:class="{disabled: userInfoNotFilled}">{{store.pageLanguages[currLang]['order-btn']}}</button>
          </div>
<!--          <input type="text" id="firstname" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['first-name']" required autofocus>-->
<!--          <label for="firstname">{{store.pageLanguages[currLang]['placeholders']['first-name']}}</label>-->
<!--          <input type="text" id="lastname" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['last-name']">-->
<!--          <label for="lastname">{{store.pageLanguages[currLang]['placeholders']['last-name']}}</label>-->
<!--          <input type="email" id="email" placeholder="example@gmail.com" required autocomplete="on">-->
<!--          <label for="email">Email</label>-->
<!--          <input type="text" id="phone" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['phone-mask']" required>-->
<!--          <label for="phone">{{store.pageLanguages[currLang]['placeholders']['phone']}}</label>-->
<!--          <input type="text" id="address" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['address']" required>-->
<!--          <label for="address">{{store.pageLanguages[currLang]['placeholders']['address']}}</label>-->
<!--          <textarea id="comment" rows="5" cols="50" v-bind:placeholder="store.pageLanguages[currLang]['placeholders']['comment']"></textarea>-->
<!--          <label for="comment">{{store.pageLanguages[currLang]['placeholders']['comment']}}</label>-->
<!--          <input type="submit" id="submit" v-bind:value="store.pageLanguages[currLang]['order-btn']">-->
        </form>
      </div>
      <div class="order-info">
        <div class="info-text" v-if="!orderAccepted">
          <div>{{store.pageLanguages[currLang]['order-info']}}</div>
          <div class="cost-text">
            <div class="order-cost">
              <span>{{store.pageLanguages[currLang]['order-cost']}}:</span>
              <span class="cost">{{fullCost}} ₽</span>
            </div>
            <div class="order-delivery-cost">
              <span v-bind:class="{zero: !deliveryCost}">{{store.pageLanguages[currLang]['order-delivery-cost']}}:</span>
              <span class="cost">{{deliveryCost}} ₽</span>
            </div>
            <div class="order-full-cost">
              <span>{{store.pageLanguages[currLang]['order-full-cost']}}:</span>
              <span class="cost">{{orderFullCost}} ₽</span>
            </div>
          </div>
        </div>
        <div class="info-text" v-else>
          <div class="first-text">
            {{store.pageLanguages[currLang]['order-text-one']}}: {{store.orderNumber}}
          </div>
          <div class="second-text">
            {{store.pageLanguages[currLang]['order-text-two']}}.
          </div>
          <div class="third-text">
            {{store.pageLanguages[currLang]['order-text-three']}}.
          </div>
          <div class="fourth-text">
            {{store.pageLanguages[currLang]['order-text-four']}}:
          </div>
          <div class="fifth-text">
            +7 (XXX) XXX-XX-XX
          </div>
          <div class="sixth-text">
            {{store.pageLanguages[currLang]['order-text-five']}}.
          </div>
        </div>
      </div>
      <div class="close-btn">
        <span class="material-symbols-outlined close-order" v-on:mouseenter="closingIsDisabled = !closingIsDisabled" v-on:mouseleave="closingIsDisabled = !closingIsDisabled"
              v-on:click="closeItem">
          close
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/store/store";
import {ref} from "vue";

export default {
  name: "Item",

  data: function () {
    return  {
      store,
      openedItemData: {
        imgPath: '',
        id: '',
        name: '',
        desc: '',
        weight: '',
      },
      imgLoaded: false,
      closingIsDisabled: false,
      form : {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        comment: '',
      },
      orderAccepted: false,
      isDisabled: ref({
        fNameErr: true,
        lNameErr: true,
        emailErr: true,
        phoneErr: true,
        addressErr: true,
      }),
    }
  },

  watch: {
    /*form(newForm) {
      this.isDisabled.fNameErr = newForm.firstName.length <= 2;
    },*/

    'form.firstName': function (newFName, oldFName) {
      this.isDisabled.fNameErr = newFName.length <= 1;
      console.log(`isDisabled.fNameErr: ${this.isDisabled['fNameErr']}`)
    },

    'form.lastName': function (newLName, oldLName) {
      this.isDisabled.lNameErr = newLName.length <= 1;
      console.log(`isDisabled.lNameErr: ${this.isDisabled['lNameErr']}`)
    },

    'form.email' : function (newEmail, oldEmail) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.isDisabled.emailErr = !re.test(newEmail);
      console.log(`isDisabled.emailErr: ${this.isDisabled['emailErr']}`)
    },

    'form.phone' : function (newPhone, oldPhone) {
      //let re = /^([+7]{2}|8)?[(]?[0-9]{3}[)]?[0-9]{7}$/;
      let re = /^([+7]{2}|8)? ?[(]?[0-9]{3}[)]? ?[0-9]{3}[ -]?[0-9]{2}[ -]?[0-9]{2}$/
      this.isDisabled.phoneErr = !re.test(newPhone);
      console.log(`isDisabled.phoneErr: ${this.isDisabled['phoneErr']}`)
    },

    'form.address' : function (newAddress, oldAddress) {
      this.isDisabled.addressErr = newAddress.length <= 5;
      console.log(`isDisabled.addressErr: ${this.isDisabled['addressErr']}`);
    }
  },

  computed: {
    currLang() {
      let index = store.pageLanguages.findIndex(x => x.name === store.pageLang);
      if (index === -1)
        return;

      return index;
    },

    fullCost() {
      let fCost = 0;
      store.cartItems.forEach(item => {
        fCost += item.cost * item.amount;
      });

      return fCost;
    },

    deliveryCost() {
      if (this.fullCost >= store.pageLanguages[this.currLang]['free-delivery'])
        return 0;

      return store.pageLanguages[this.currLang]['delivery-cost'];
    },

    orderFullCost() {
      return parseInt(this.fullCost) + parseInt(this.deliveryCost);
    },

    userInfoNotFilled() {
      if (this.isDisabled['fNameErr'] ||
          this.isDisabled['lNameErr'] ||
          this.isDisabled['emailErr'] ||
          this.isDisabled['phoneErr'] ||
          this.isDisabled['addressErr'])
        return true;
    },
  },

  methods:  {

    submitForm() {
      if (!this.isDisabled['fNameErr'] &&
          !this.isDisabled['lNameErr'] &&
          !this.isDisabled['emailErr'] &&
          !this.isDisabled['phoneErr'] &&
          !this.isDisabled['addressErr']) {
        console.log(`form submitted: \n
                  first-name: ${this.form.firstName} \n
                  last-name: ${this.form.lastName} \n
                  email: ${this.form.email} \n
                  phone: ${this.form.phone} \n
                  address: ${this.form.address} \n
                  comment: ${this.form.comment}
                  `);

        /*fetch(`https://my-json-server.typicode.com/denvolk/restaurant-db/orders/`, {
          body: "id": "", "name": "",
        })*/
        fetch(`https://my-json-server.typicode.com/denvolk/restaurant-db/orders`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id: `${Date.now()}&${this.orderFullCost}`,
                                      "fName": this.form.firstName,
                                      "lName": this.form.lastName,
                                      "email": this.form.email,
                                      "phone": this.form.phone,
                                      "address": this.form.address,
                                      "comment": this.form.comment
          })
        }).then(res => res.json())
            .then(res => {console.log(res); store.orderNumber = res['id']; this.orderAccepted = true;});
      }
    },

    setImgLoadState() {
      this.imgLoaded = true;
    },

    closeItem() {
      if (this.closingIsDisabled)
        return;

      store.fullPageItem = store.foodItem = this.imgLoaded = store.itemOpened = store.shownItem.isOrder = this.orderAccepted = false;
      //document.getElementsByTagName('html')[0].classList.remove("noscroll");
    },
  },
}
</script>

<style scoped>
.zero {
  text-decoration-line: line-through;
}

.item {
  display: none;
}

.opened {
  /*display: flex;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 48.5%;
  top: 50%;
  z-index: 99;
  overflow: hidden;
  background-color: #fff;
  border: 3px solid black;
  border-radius: 1em;
  margin: 2em;
  padding: 2em;
  min-width: 30em;*/
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  padding: 20px 0;
  background: rgba(0,0,0,.4);
  transition: opacity .5s ease,visibility .5s ease;
}

.item-data  {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  background-color: #fff;
  /*border: 3px solid black;*/
  border-radius: 1em;
  /*padding: 0 1em;*/
  padding-right: 1em;
  width: 46em;
  height: 20em;
  box-shadow: 0 0 10px;
}

.order-data {
  height: 23em;
  padding: 2em;
}

.cost-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.order-cost, .order-delivery-cost, .order-full-cost {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.order-cost {
  margin: 1em 0 0.5em 0;
}
.order-delivery-cost, .order-full-cost {
  margin: 0 0 0.5em 0;
}

.user-data {
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  /*text-align: left;*/
  width: 24.25em;
}

.order-info {
  padding: 0.5em 0 0 1em;
  width: 19.75em;
}

.info-text {
  text-align: left;
  width: 19.75em;
}

.info-text span {
  /*margin: 0 0.5em 1em 0;*/
  min-width: 10.5em;
  text-align: left;
}

.info-text span.cost {
  text-align: right;
  margin: 0;
}

.form {
  /*display: flex;*/
  /*flex-direction: column;*/
}

.field {
  /*display: flex;*/
  /*flex-direction: column-reverse;*/
  position: relative;
}

button {
  outline: none;
  border:none;
  background-image:none;
  background-color:transparent;
  box-shadow: none;
}

.field.submit button {
  font-family: Rubik, sans-serif;
  color: #000;
  background-color: #c2c2c2;
  outline: none;
  border: 0;
  padding: 10px 20px;
  text-transform: uppercase;
  border-radius: 0.25em;
  cursor: pointer;
  position: relative;
  width: 29.25em;
  margin-top: -0.25em;
}

.field.submit button:hover {
  background-color: rgba(66, 185, 131, 1);
}

.field.submit button.disabled {
  cursor: default;
}

.field.submit button.disabled {
  background-color: #c2c2c2;
  cursor: default;
}

textarea {
  resize: none;
}

@media (-webkit-device-pixel-ratio: 1.25) {
  .item-data {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    background-color: #fff;
    /*border: 2px solid black;*/
    border-radius: 0.9em;
    /* padding: 0 1em; */
    padding-right: 1em;
    width: 46em;
    height: 19.6em;
  }
}

.name, .description, .weight  {
  text-align: left;
}

.name {
  font-size: 1.75rem;
}

img {
  width: 23em;
  border-radius: 0.75em 0 0 0.75em;
}

@media (-webkit-device-pixel-ratio: 1.25) {
  img {
    width: 22.5em;
  }
}

.img-container  {
  width: 23em;
  height: 20em;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 5px 0 20px rgb(117 115 111 / 20%);
}

.text {
  width: 23em;
  /* height: 36em; */
  display: flex;
  justify-content: space-evenly;
  /* align-items: center; */
  flex-direction: column;
  padding-left: 1em;
  font-size: 1.25rem;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0,
  'wght' 700,
  'GRAD' 200,
  'opsz' 48
}

.material-symbols-rounded.err {
  font-variation-settings: 'FILL' 0,
  'wght' 100,
  'GRAD' 200,
  'opsz' 20;

  color: rgba(66, 185, 131, 1);
  position: absolute;
  right: 0;
  top: 0.2em;
  z-index: 999;
  /*left: -1.1em;*/
  /*top: 0.75em*/
}

.material-symbols-rounded.err.lname {

}

.material-symbols-rounded.err.lname {
  top: 2.1em;
}

.material-symbols-rounded.err.email-err {

}

.material-symbols-rounded.err.address-err {
  top: 0;
}

.addressCorrect,
.addressCorrect:focus-visible{
  border: 1px solid rgba(66, 185, 131, 1);
}

textarea {
  border: 1px solid black;
  border-radius: 2px;
}

textarea:focus-visible {
  outline: none;
  border:none;
  background-image:none;
  background-color:transparent;
  box-shadow: none;
  border: 1px solid black;
  border-radius: 2px;
}

.close {
  user-select: none;
  cursor: pointer;
  margin-top: 0.75em;
}

.close-order {
  user-select: none;
  cursor: pointer;
  margin-top: -1.5em;
}

/*input[type="text"], input[type="email"], textarea {
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  background-image:none;
  background-color:transparent;
  box-shadow: none;
}*/

.input-container{
  position:relative;
  /*margin-bottom:25px;*/
  margin-bottom: 1em;
}
/*.input-container:last-child,
.input-container:nth-last-child(2) {
  margin-bottom: 1em;
}*/
.input-container label{
  position:absolute;
  top: 0.5em;
  left: 0em;
  font-size:16px;
  color:#000;
  pointer-event:none;
  transition: all 0.5s ease-in-out;
}
.input-container input{
  font-family: Rubik, sans-serif;
  border:0;
  border-bottom:1px solid #555;
  background:transparent;
  width:100%;
  padding:8px 0 3px 0;
  font-size:1em;
  color:#000;
}
.input-container input:focus{
  border:none;
  outline:none;
  border-bottom:1px solid #e74c3c;
}

/*.input-container input:focus ~ label,*/
/*.input-container input:valid ~ label{*/
/*  top:-12px;*/
/*  font-size:12px;*/
/*}*/

/*.input-container input:focus ~ label {*/
/*  top:-12px;*/
/*  font-size:12px;*/
/*}*/

.input-container input:focus ~ label,
.input-container input:not(:placeholder-shown) ~ label {
  top: -0.5em;
  font-size: 0.75em;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus
/*textarea:-webkit-autofill,*/
/*textarea:-webkit-autofill:hover,*/
/*textarea:-webkit-autofill:focus,*/
/*select:-webkit-autofill,*/
/*select:-webkit-autofill:hover,*/
/*select:-webkit-autofill:focus*/ {
/*  border: 1px solid green;*/
  /*-webkit-text-fill-color: green;*/
  font-size:1em;
  /*-webkit-box-shadow: 0 0 0px 1000px #000 inset;*/
  transition: background-color 5000s ease-in-out 0s;
}

textarea {
  font-family: Rubik, sans-serif;
  font-size: 1em;
  width: 24em;
}

@media (-webkit-device-pixel-ratio: 1.25) {

  @media screen and (min-width: 1500px) {
    .item-data.order-data {
      height: 23em;
      width: 47em;
    }
  }
}

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  align-self: center;
  margin-top: 2em;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #cef;
  border-color: #cef transparent #cef transparent;
  animation: lds-hourglass 3.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>