
//function to add extra 0 and format to xxxx-xxx-xxx in front of phoneNumber as database loses it 
export default function FormatPNumber(phoneNumber) {
    phoneNumber = phoneNumber.toString();
  
    if (phoneNumber.length < 10) {
      phoneNumber = '0'.repeat(10 - phoneNumber.length) + phoneNumber; 
      //creates a string of zeros ('0') repeated 10 - phoneNumber.length times
    }
  
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
  }
  