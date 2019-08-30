import { body } from 'express-validator';
import CustomerStatic from '../../statics/CustomerStatic';

const COUNTRY_LIST = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
	,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
	,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
	,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
	,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
	,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
	,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
	,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
	,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
	,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
	,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
	,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
	,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
	,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
	,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

const nameCheck = body('name').not().isEmpty().withMessage('Name field must be filled in.').isLength({min:4, max: 30}).withMessage('Name field must be between 4 and 30 chars long.');
const emailCheck = body('email').isEmail().withMessage('Email field must be of valid format.');
const emailInUse = body('email').custom(async value => {
  const c = await CustomerStatic.count({where: {email: value}});
  if( c !== 0) throw new Error('Email already in use.');
});
const passwordCheck = body('password').not().isEmpty().withMessage('Password field can\'t be empty.').isLength({min:4, max:30}).withMessage('Password field must be between 4 and 30 chars long.');
const dayPhoneCheck = body('dayPhone').isMobilePhone('any').withMessage('Must be valid phone number.');
const evePhoneCheck = body('evePhone').isMobilePhone('any').withMessage('Must be valid phone number.');
const mobPhoneCheck = body('mobPhone').isMobilePhone('any').withMessage('Must be valid phone number.');
const postalCodeCheck = body('postalCode').toInt().isInt().withMessage('Postal code can\'t contain text.');
const countryCheck = body('country').isIn(COUNTRY_LIST).withMessage('Must be a valid country.');
const address = (addr: string) => {
  return body(addr).not().isEmpty().withMessage(addr + ' can\'t be empty.');
}
const regionCheck = body('region').not().isEmpty().withMessage('Region field can\'t be empty');
const cityCheck = body('city').not().isEmpty().withMessage('City field is requiried.');

export default {
    login: [
      emailCheck,
      passwordCheck
    ],
    register: [
      nameCheck,
      emailCheck,
      emailInUse,
      passwordCheck  
    ],
    profile: [
        nameCheck,
        emailCheck,
        passwordCheck,
        dayPhoneCheck,
        evePhoneCheck,
        mobPhoneCheck,
    ],
    profileAddress: [
      postalCodeCheck,
      countryCheck,
      address('address1'),
      regionCheck,
      cityCheck
    ],
    errorFormatter: ({ location, msg, param, value, nestedErrors }: any) => {
        return `${msg}`;
      }
};