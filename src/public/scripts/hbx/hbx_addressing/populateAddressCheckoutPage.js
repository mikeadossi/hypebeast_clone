/* global $, window */
/* exported populateAddressCheckoutPage */

const populateAddressCheckoutPage = () => {

  if(!window.localStorage.hbxLocalCart){
    $(".hbx_addressing_content").remove();
    $(".localStorageAddressCheckoutContent").append(`
        <h1 class="hbx_error_msg">Page not found</h1>
      `);
  } else {

    let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);
    let bag_subtotal = 0;

    for(let i = 0; i < hbxLocalCart.length; i++){
      bag_subtotal += hbxLocalCart[i].item_cost;
    }

    $(".localStorageAddressCheckoutContent").append(`
        <div class="hbx_addressing_content">
          <div class="hbx_checkout_header">
            Checkout
          </div>
          <div class="checkout_progressbar">
            <div class="checkout_steps" id="step_one">
              <span class="checkout_step_number">1</span>
              <span class="checkout_title">CONTACT & ADDRESSES</span>
              <span class="checkout_edit">Edit</span>
            </div>
            <div class="checkout_steps" id="step_two">
              <span class="checkout_step_number">2</span>
              <span class="checkout_title">DELIVERY & PAYMENT</span>
            </div>
            <div class="checkout_steps" id="step_three">
              <span class="checkout_step_number">3</span>
              <span class="checkout_title">ORDER COMPLETE</span>
            </div>
          </div>

          <form class="contact_form" method="post" action="/checkout/delivery_and_payment">
            <div class="checkout_sub_content">
              <div class="contact_details_container">
                <div class="checkout_header">
                  Contact Details
                </div>
                <div class="row">
                  <div class="checkout_form_group">
                    <div class="contact_first_name contact_label_container">
                      <label for="">FIRST NAME</label>
                    </div>
                    <div class="contact_input_container">
                      <input class="first_name_input" type="text" name="first_name" />
                    </div>
                  </div>
                  <div class="checkout_form_group">
                    <div class="contact_last_name contact_label_container">
                      <label for="">LAST NAME</label>
                    </div>
                    <div class="contact_input_container">
                      <input class="last_name_input" type="text" name="last_name" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="checkout_form_group">
                    <div class="contact_phone contact_label_container">
                      <label for="">PHONE</label>
                    </div>
                    <div class="contact_input_container">
                      <input class="phone_input" type="text" name="phone" />
                    </div>
                  </div>
                  <div class="checkout_form_group">
                    <div class="contact_email contact_label_container">
                      <label for="">EMAIL</label>
                    </div>
                    <div class="contact_input_container">
                      <input class="email_input" type="text" name="order_email" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="checkout_form_group">
                    <div class="contact_email contact_label_container">
                      <label for="">CONFIRM EMAIL</label>
                    </div>
                    <div class="contact_input_container">
                      <input class="email_input" type="text" name="confirm_order_email" />
                    </div>
                  </div>
                </div>
                <div class="checkout_header">
                  Shipping Address
                </div>
                <div class="error_message"></div>
                <div class="row">
                  <div class="checkout_form_group">
                    <div class="contact_first_name contact_label_container">
                      <label for="">ADDRESS LINE</label>
                    </div>
                    <div class="contact_input_container">
                      <input class="first_name_input wide_checkout_input" type="text" name="street" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="checkout_form_group">
                    <div class="contact_town_city contact_label_container">
                      <label for="">TOWN/CITY</label>
                    </div>
                    <div class="contact_input_container">
                      <input class="city_input" type="text" name="city" />
                    </div>
                  </div>
                  <div class="checkout_form_group checkout_form_wide">
                    <div class="contact_postcode contact_label_container">
                      <label for="">POSTCODE/ZIP</label>
                    </div>
                    <div class="contact_input_container">
                      <input class="postcode_input" type="text" name="postcode" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="checkout_form_group checkout_form_wide">
                    <div class="contact_country contact_label_container">
                      <label for="">COUNTRY</label>
                    </div>
                    <div class="contact_input_container">
                      <select class="country_input" name="country" type="text">
                        <option value="AF">Afghanistan</option>
                        <option value="AX">Åland Islands</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AS">American Samoa</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antarctica</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia, Plurinational State of</option>
                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BV">Bouvet Island</option>
                        <option value="BR">Brazil</option>
                        <option value="IO">British Indian Ocean Territory</option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CV">Cape Verde</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CX">Christmas Island</option>
                        <option value="CC">Cocos (Keeling) Islands</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CD">Congo, the Democratic Republic of the</option>
                        <option value="CK">Cook Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CI">Côte d'Ivoire</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CW">Curaçao</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FK">Falkland Islands (Malvinas)</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GF">French Guiana</option>
                        <option value="PF">French Polynesia</option>
                        <option value="TF">French Southern Territories</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GL">Greenland</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GU">Guam</option>
                        <option value="GT">Guatemala</option>
                        <option value="GG">Guernsey</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HM">Heard Island and McDonald Islands</option>
                        <option value="VA">Holy See (Vatican City State)</option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran, Islamic Republic of</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IM">Isle of Man</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JE">Jersey</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="KP">Korea, Democratic People's Republic of</option>
                        <option value="KR">Korea, Republic of</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Lao People's Democratic Republic</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MO">Macao</option>
                        <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MQ">Martinique</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="YT">Mayotte</option>
                        <option value="MX">Mexico</option>
                        <option value="FM">Micronesia, Federated States of</option>
                        <option value="MD">Moldova, Republic of</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MS">Montserrat</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="NC">New Caledonia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="NU">Niue</option>
                        <option value="NF">Norfolk Island</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PW">Palau</option>
                        <option value="PS">Palestinian Territory, Occupied</option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PN">Pitcairn</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="QA">Qatar</option>
                        <option value="RE">Réunion</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russian Federation</option>
                        <option value="RW">Rwanda</option>
                        <option value="BL">Saint Barthélemy</option>
                        <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint Lucia</option>
                        <option value="MF">Saint Martin (French part)</option>
                        <option value="PM">Saint Pierre and Miquelon</option>
                        <option value="VC">Saint Vincent and the Grenadines</option>
                        <option value="WS">Samoa</option>
                        <option value="SM">San Marino</option>
                        <option value="ST">Sao Tome and Principe</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="RS">Serbia</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SX">Sint Maarten (Dutch part)</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="GS">South Georgia and the South Sandwich Islands</option>
                        <option value="SS">South Sudan</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SJ">Svalbard and Jan Mayen</option>
                        <option value="SZ">Swaziland</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syrian Arab Republic</option>
                        <option value="TW">Taiwan, Province of China</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania, United Republic of</option>
                        <option value="TH">Thailand</option>
                        <option value="TL">Timor-Leste</option>
                        <option value="TG">Togo</option>
                        <option value="TK">Tokelau</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TC">Turks and Caicos Islands</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="UM">United States Minor Outlying Islands</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VE">Venezuela, Bolivarian Republic of</option>
                        <option value="VN">Viet Nam</option>
                        <option value="VG">Virgin Islands, British</option>
                        <option value="VI">Virgin Islands, U.S.</option>
                        <option value="WF">Wallis and Futuna</option>
                        <option value="EH">Western Sahara</option>
                        <option value="YE">Yemen</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="checkout_form_group checkout_form_wide">
                    <div class="contact_state contact_label_container">
                      <label for="">PROVINCE/STATE</label>
                    </div>
                    <div class="contact_input_container">
                      <select class="country_input" name="country" type="text">
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Louisiana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>
                        <option value="">-- CANADA --</option>
                        <option value="Alberta">Alberta</option>
                        <option value="British Columbia">British Columbia</option>
                        <option value="Manitoba">Manitoba</option>
                        <option value="New Brunswick">New Brunswick</option>
                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                        <option value="Northwest Territories">Northwest Territories</option>
                        <option value="Nova Scotia">Nova Scotia</option>
                        <option value="Nunavut">Nunavut</option>
                        <option value="Ontario">Ontario</option>
                        <option value="Prince Edward Island">Prince Edward Island</option>
                        <option value="Quebec">Quebec</option>
                        <option value="Saskatchewan">Saskatchewan</option>
                        <option value="Yukon Territory">Yukon Territory</option>
                        <option value="">-- AUSTRALIA --</option>
                        <option value="Australian Capital Territory">Australian Capital Territory</option>
                        <option value="New South Wales">New South Wales</option>
                        <option value="Northern Territory">Northern Territory</option>
                        <option value="Queensland">Queensland</option>
                        <option value="South Australia">South Australia</option>
                        <option value="Tasmania">Tasmania</option>
                        <option value="Victoria">Victoria</option>
                        <option value="Western Australia">Western Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="checkout_form_group">
                    <div class="contact_company contact_label_container">
                      <label for="">COMPANY NAME</label>
                    </div>
                    <div class="contact_input_container">
                      <input class="company_input wide_checkout_input" type="text" name="company_name" />
                    </div>
                  </div>
                </div>
                <div class="checkout_header">
                  Billing Address
                </div>
                <div class="contact_billing">
                  <input type="radio" checked="checked">
                  <p>Same billing address?</p>
                </div>
                <div class="checkout_header">
                  Order Notes
                </div>
                <textarea class="checkout_textarea" name="order_notes" rows="10" cols="30" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
              </div>
              <div class="checkout_order_summary_container">
                <div class="order_summary_heading">
                  Order Summary
                </div>
                <p class="checkout_order_notice">
                  Please note: Items and promotional pricing are not reserved until checkout is complete.
                </p>
                <div class="checkout_items_main_container"></div>
                <div class="checkout_summary_container">
                  <div class="checkout_total">
                    <div class="bag_total_label">
                      Bag Subtotal
                    </div>
                    <div class="bag_total align_right">
                      <span>USD</span>
                      <span class="checkout_item_final_cost bag_subtotal">`+bag_subtotal+`.00</span>
                    </div>
                  </div>
                  <div class="checkout_total">
                    <div class="bag_label">
                      *Duty/Tax
                    </div>
                    <div class="bag_total align_right">
                      <span>USD</span>
                      <span class="checkout_item_final_cost">0.00</span>
                    </div>
                  </div>
                  <div class="checkout_total">
                    <div class="shipping_label">
                      Shipping Total
                    </div>
                    <div class="shipping_total align_right">
                      <span>USD</span>
                      <span class="checkout_item_final_cost">Free Shipping</span>
                    </div>
                  </div>
                </div>
                <div class="checkout_order_details">
                  <span>ORDER TOTAL</span>
                  <div class="checkout_order_usd">
                    <span>USD</span>
                    <span class="checkout_item_final_cost checkout_subtotal">`+bag_subtotal+`.00</span>
                  </div>
                </div>
                <input class="checkout_continue_button" type="submit" value="CONTINUE">
              </div>
            </form>
          </div>
        </div>
        `);

    for(let i = 0; i < hbxLocalCart.length; i++){
      $(".checkout_items_main_container").append(`
          <div class="checkout_item_container">
            <div class="checkout_item_img">
              <img src=`+hbxLocalCart[i].item_image+` alt="">
            </div>
            <div class="checkout_item_details_container">
              <div class="checkout_item_brand">
                brand
              </div>
              <div class="checkout_item_name">
                `+hbxLocalCart[i].item_name+`
              </div>
              <div class="checkout_item_size">
                <span>Size: </span>
                <span class="checkout_item_final_size">`+hbxLocalCart[i].item_size+`</span>
              </div>
              <div class="checkout_item_quantity">
                <span>Qty: </span>
                <span class="checkout_item_final_quantity">`+hbxLocalCart[i].item_quantity+`</span>
              </div>
            </div>
            <div class="checkout_item_usd">
              <span>USD</span>
              <span class="checkout_item_final_cost">`+hbxLocalCart[i].item_cost+`.00</span>
            </div>
          </div>
        `);
    }

  }
};
