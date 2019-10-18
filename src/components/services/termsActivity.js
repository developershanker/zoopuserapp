import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,WebView } from 'react-native';


export default class TermsActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
     
            <WebView
            originWhitelist={['*']}
            source={{html: htmlContent}}
            />
        );
    }
}
const styles = StyleSheet.create({
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
})
const htmlContent = "<p align=\"justify\">\n" +
    "    A. <strong>INTRODUCTION</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong>Welcome to Zoop!</strong>\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    Thanks for choosing to use our services (‘Services’). The Services are provided by Zoop which is a brand of Zoop Web Services Private Limited, a company\n" +
    "    registered under the Indian Companies act.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    We believe in honest and transparent business systems, and our intention is to bring the most ethical work practices. Therefore, it is our request to every\n" +
    "    user and visitor of our website i.e. zoopindia.com to read all the below mentioned terms and conditions carefully.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    By ordering any product or Services from this Website or its phone applications or through our call centre number displayed on this website, you agree to\n" +
    "    be bound by these Terms and Conditions. Moreover, our Services are very diverse, therefore, sometimes additional terms or service requirements may apply\n" +
    "    for some services. Any such additional terms will be available with the relevant Services, and those additional terms become part of your agreement with us\n" +
    "    if you use those Services.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    B. <strong>DEFINITIONS</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. We are Zoop, a brand of Zoop Web Services Private Limited, a company registered under the Indian Companies Act, unless otherwise stated. ’Agreement’ is\n" +
    "    a reference to these Terms and Conditions, the Privacy Policy, any order form and payment instructions provided to you;\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. ‘Website’ is a reference to our Website http://www.zoopindia.com on which we offer our Product or Services.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. ‘Service’ or ‘Services’ is a reference to any service which we may supply and which you may request via our Website.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. ‘Restaurant’, ‘Outlet’ or ‘Outlets’ are restaurant and restaurant owners who prepare and/or deliver the Product or Services ordered on this web site.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. ‘Privacy Policy’ means the policy displayed on our Website which details of how we collect and store your personal data;\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    6. ‘Customer’, ‘you’, ‘your’, ‘yours’, ‘users’ are references to you the person accessing this Website and ordering any Product or Services from the\n" +
    "    Website or from any other channel provided by Zoop\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    7. ‘we’, ‘us’, ‘our’, and ‘Zoop’ are references to the Company;\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    8. ‘Product’ is a reference to any goods which we may offer for sale from our Website from time to time.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    9. ‘Food Delivery’ is a reference to perishable goods and to any form of delivery service, which both are provided by Restaurants chosen for delivery.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    C. <strong>OUR ROLE</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. Zoop offer you a means of communication to the restaurants doing food delivery at various places and the person ordering the food.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. We have our call centre number displayed on this website to help all our customers call and share feedback, for any problem or dispute in the items\n" +
    "    received, or change or cancel the order.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. Zoop may call, send SMS and/or use other possible modes but not limited to Electronic or Printed medium for communicating with the customers or to take\n" +
    "    their feedback.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. Most areas of this Website are open to everyone. You may access some areas of this Website without making any order, and registering your details with\n" +
    "    us.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. By accessing any part of this Website, you indicate that you accept all these Website Terms &amp; Conditions. However, if you do not accept these\n" +
    "    Website Terms, you must leave this Website immediately.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    6. Zoop may prefer to revise the terms &amp; conditions of use of this website without any prior consent or notice and by using this website, you are\n" +
    "    agreeing to be bound by the then current version of these Terms and Conditions of Use.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    7. Visitors of this website are also responsible for making all arrangements necessary for have accessing this Website. Visitors are therefore also\n" +
    "    responsible for ensuring that all anyone who access the Website through their Internet connection are aware of these Website Terms and that they comply\n" +
    "    with them also.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    D. <strong>ORDER BOOKING AND PROCESSING</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. All orders booked on this website or through its call centre number is actually a contract for the supply of Food Delivery between you and the\n" +
    "    Restaurant.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. Customers are requested to check all the information and details they are filling in while booking the orders. Please note it is the customer’s\n" +
    "    responsibility to check the information that they have entered, and correct any errors before clicking on the \"Book Order\" button since once a customer\n" +
    "    clicks on this, an order ID is created and input errors cannot be corrected.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. If at any time prior to you clicking on the \"Book Order\" button, you decide that you do not wish to proceed with your order, you should close the\n" +
    "    application window.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. In case a customer selects ‘Cash on Delivery’ (COD) before clicking on the \"Book Order\" button, Zoop will begin processing your order and we will send\n" +
    "    you notification by SMS that your order is being processed. For online payment orders, on receipt of your payment, Zoop will begin processing your order\n" +
    "    and we will send you notification by SMS and email that payment has been received and that your order is being processed. SMS and email confirmation will\n" +
    "    be produced automatically so that you have confirmation of your order details. You must inform us immediately if any details are incorrect. The fact that\n" +
    "    you receive an automatic confirmation does not necessarily mean that either we or the Delivery Restaurant will be able to fill your order.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. In the case of online payment, if any payment you make is not authorized you will be returned to the previous page on the Website and we shall not be\n" +
    "    obliged to provide the services.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    6. Please note that once you have made your order and your payment has been authorized you will be able to cancel your order according to details mentioned\n" +
    "    in our cancellation policy.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    7. Please note that from time to time there may be delays with processing payments and transactions, on occasion this can take up to sixty (60) days to be\n" +
    "    deducted from your bank account.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    E. <strong>PRICE AND PAYMENTS</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. Prices for all the items will be mentioned on the website. All these prices are inclusive of relevant taxes and delivery charges. In case a specific\n" +
    "    Restaurant requires a service charge (for instance for orders below the minimum order amount), this will be clearly indicated on this Website, in the\n" +
    "    itemized bill, and added to the total amount due.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. We take a lot of care in ensuring that prices for all the items mentioned in this website are correct, but however, there could be a scenario, where the\n" +
    "    prices quoted on this website may have an error as there is a large list of items at every station which keep on adding every day. In such a case, Zoop\n" +
    "    will call and inform the customer before the order is dispatched for delivery, informing the customer about the error and requesting him to pay the actual\n" +
    "    price. We are therefore under no obligation to ensure that the order is provided to you at the incorrect lower price or to compensate you in respect of\n" +
    "    incorrect pricing.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. All payment for all orders must be by credit or debit card as stated on this Website or in cash at the point of delivery.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. If you chosen to make online payment, then you are required to pay for your order before it is delivered. To ensure that secure and safe online\n" +
    "    shopping, your debit/credit card details will be encrypted to prevent the possibility of someone being able to read them as they are sent over the\n" +
    "    internet. Your credit card company may also conduct security checks to verify if you yourself are using your card and placing the order.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. We run promotional offers on this website through promotional codes. Customers can therefore avail these discounts by using such promotional codes\n" +
    "    endorsed by us while booking orders on this website.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    F. <strong>DELIVERY</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. Delivering the food items ordered on this website is the sole responsibility of the restaurant in the stipulated time with proper packing and hygiene.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. We try our best in co-ordinating delivery of the orders with the restaurants, but however if in an unfortunate situation the said delivery fails, then\n" +
    "    we request the customers to get in touch with us immediately, and we will try to arrange the delivery at the next available upcoming station. Moreover, we\n" +
    "    too take a very close watch at all the deliveries, and ourselves arrange for deliveries at upcoming stations, but it becomes very helpful when customers\n" +
    "    themselves notify us of any such occurrence.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. In the event of customer’s unavailability to accept the order at the time of delivery, or if the customer is unavailable at the mentioned coach and seat\n" +
    "    number, or if you are unable to communicate to us your updated coach and seat number (only in case of W/L or RAC situations), then such orders shall be\n" +
    "    deemed to have been delivered to you and all risk and responsibility in relation to such deliveries shall pass on to you. Any costs which we incur as a\n" +
    "    result of the inability to deliver shall be your responsibility of the customer and therefore shall indemnify us in full for such cost.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. Restaurants delivering the orders will aim to deliver the exact order placed by you within the stoppage time at that particular station chosen by you.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. Restaurants and we shall not be liable to you for any losses, liabilities, costs, damages, charges or expenses arising out of late delivery.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    G. <strong>CANCELLATION POLICY</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. We allow our customers to cancel their orders up till 2 hours before the actual pre decided delivery timings between 9am to 9pm on any working day. For\n" +
    "    example – If your actual pre decided delivery time is 6pm, then you may cancel your order on or before 4pm on the same day. However if your deliver time is\n" +
    "    9.30am, then you’ll have to do the same on or before 9pm on a day before.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. The cut off time in terms of bulk / group orders is 12 hours before the scheduled delivery time or 6pm on the previous day, whichever is earlier.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. In the interest of the customer’s privacy and genuineness of the cancellation, we would prefer to cancel orders only if requests come from the mobile\n" +
    "    numbers used for order bookings along with the order ID or through registered customer user Ids. However, if the customer is unable to access both the\n" +
    "    tools, then our team would first verify the customer through some basic questions and then process the cancellations.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. Any change in order will apply cancellation of the original order, and hence a new order ID will be generated.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. In the event of no show from the customer at the time of delivery, then it’ll be treated as cancelled post 2 hour cut off time and customers will not be\n" +
    "    eligible for any refund.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    6. An SMS will be sent to the customers on the event of cancellations of orders at the mobile number shared by the customer with Zoop. In the event that no\n" +
    "    SMS is received, customers are advised to call our help line number 801080 2222 for confirmations.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    H. <strong>REFUND ON CANCELLATIONS</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    If the payment is made by the customer in advance then he may be eligible for refunds as per following terms.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. Orders cancelled before 24 hours of scheduled delivery time will be eligible for 100% refunds.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. Orders cancelled between 24 hours and before 2 hours of scheduled delivery time, then we’ll reimburse the entire amount after deducting 10% order\n" +
    "    cancellation charges.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. No order will be cancelled post 2 hour cut off time, and therefore no refunds.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. In the event of no show from the customer at the time of delivery, then it’ll be treated as cancelled post 2 hour cut off time and customers will not be\n" +
    "    eligible for any refund.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. In case of all orders booked by customers themselves through our website, all refunds would take place in the accounts used by customers for order\n" +
    "    booking.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    6. In case of all orders booked through our authorized agents, all refunds will be available from the same agent only.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong>Refund on Cancellations on Pre-paid Bulk order (Group Order) Bookings</strong>\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    We provide additional discounts for bulk / group order bookings to our customers, and moreover we believe that our customers would too understand that it\n" +
    "    takes lot of preparation and co-ordination for delivering food to a large number of people. Therefore, if the payment is made by the customer in advance\n" +
    "    then he may be eligible for refunds as per following terms.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. Orders cancelled before 24 hours of scheduled delivery time will be eligible for 100% refunds.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. Orders cancelled between 24 hours and before 12 hours of scheduled delivery time, then we’ll reimburse the entire amount after deducting 10% order\n" +
    "    cancellation charges.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. No order will be cancelled post 12 hour cut off time, and therefore no refunds.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. In the event of no show from the customer at the time of delivery, then it’ll be treated as cancelled post 12 hour cut off time and customers will not\n" +
    "    be eligible for any refund.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. In case of all orders booked by customers themselves through our website, all refunds would take place in the accounts used by customers for order\n" +
    "    booking.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    6. In case of all orders booked through our authorized agents, all refunds will be available from the same agent only.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    I. <strong>USER LICENCE</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. We grant permission to temporarily download one copy of the materials (information or software) on our web site for personal, non-commercial transitory\n" +
    "    viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    a) modify or copy the materials,\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    b) use the materials for any commercial purpose, or for any public display (commercial or non-commercial);\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    c) attempt to decompile or reverse engineer any software contained on this web site,\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    d) remove any copyright or other proprietary notations from the materials; or\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    e) transfer the materials to another person or \"mirror\" the materials on any other server.\n" +
    "</p>\n" +
    "<p>\n" +
    "    2. This license shall automatically terminate if any of the above mentioned restrictions are violated and may be terminated by Zoop at any time. Upon\n" +
    "    terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether\n" +
    "    in electronic or printed format.\n" +
    "    <br/>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. Any rights not expressly granted in these Website terms are reserved.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    J. <strong>LINKS TO OUR WEBSITE</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    We do not allow anyone to create a link to any page of our websites without our prior written consent. However, if you do create a link to a page of this\n" +
    "    website, then you are doing so at your own risk and the exclusions and limitations set out above will apply to your use of this website by linking to it.\n" +
    "    This means that the website from which you link must comply with the content standards set out in these Website Terms.\n" +
    "</p>\n" +
    "<p>\n" +
    "    K. <strong>LINKS FROM OUR WEBSITE</strong><strong></strong>\n" +
    "</p>\n" +
    "<p>\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    Links to third party websites on this Website are provided solely for the convenience of our visitors and customers. We advise our users to read the\n" +
    "    privacy statements of all the web sites linked from our site, as we don’t review or monitor the content of other party's websites which are linked to from\n" +
    "    our website. All the opinions expressed and materials appearing on such websites are not necessarily shared or endorsed by us and thereby we should not be\n" +
    "    regarded as the publisher of such opinions or material. Therefore, please be aware that we are not responsible for the privacy practices and content of\n" +
    "    such sites. You should evaluate the security and trustworthiness of any other site connected to this site or accessed through this site yourself, before\n" +
    "    disclosing any personal information to them. We will not accept any responsibility for any loss or damage in whatever manner, howsoever caused, resulting\n" +
    "    from your disclosure to third parties of personal information.<strong></strong>\n" +
    "</p>\n" +
    "<p>\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    L. <strong>SERVICE ACCESS</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. We always try to ensure that this Website is normally available twenty four (24) hours a day; however, we will not be liable if this Website is\n" +
    "    unavailable at any time or for any period.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. Access to this Website may be suspended temporarily and without notice.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. We understand that unfortunately, the transmission of information via the internet is not completely secure, therefore we will take steps to protect\n" +
    "    your information, but we cannot guarantee the security of your data transmitted to the Website; any transmission is at your own risk.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    M. <strong>VISITOR MATERIAL AND CONDUCT</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. Other than personally identifiable information, which is covered under our Privacy Policy, any material you transmit or post to this Website will be\n" +
    "    considered as non-confidential and non-proprietary. We will have no obligations with respect to such material. Zoop and anyone we designate will be free to\n" +
    "    copy, disclose, distribute, incorporate and otherwise use that material and all data, images, sounds, text and other things embodied in it for any and all\n" +
    "    commercial or non-commercial purposes.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. You are prohibited from posting, uploading or transmitting to or from this Website any material that:\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    a) Breaches any applicable local, national or international law;\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    b) Is unlawful or fraudulent;\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    c) Amounts to unauthorized advertising; or\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    d) Contains viruses or any other harmful programs.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. You may not misuse the Website (including by hacking).\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. Any comments or feedback that you submit through the Website must not:\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    a) Promote illegal activity or invade another's privacy;\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    b) Infringe the intellectual property rights of another person;\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    c) Contain any defamatory, obscene or offensive material;\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    d) Promote violence or discrimination;\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    e) Be used to impersonate another person or to misrepresent your affiliation with another person,\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    f) Breach any legal duty owed to a third party (such as a duty of confidence);\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    g) Give the impression that they originate from us.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. All the prohibited acts listed above are non-exhaustive. Violators will be bound to pay us for all the costs and damages which we would incur as a\n" +
    "    result of breaching of any of these restrictions.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    6. Zoop will actively participate in fully co-operating with any law enforcement authorities or court order requesting or directing us to disclose the\n" +
    "    identity or location of anyone posting any material in breach of any of the above mentioned restrictions.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    N. <strong>DISCLAIMER</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. We always try to ensure that information on this Website is correct, however we do not promise it is accurate or complete. Zoop may make changes to the\n" +
    "    material on this Website from time to time, or to the services and prices described in it, at any time without notice. The material on this Website may be\n" +
    "    out of date, and Zoop makes no commitment to update that material. In particular, we do not promise that the information provided by the Delivery\n" +
    "    Restaurants and displayed on this Website such as the menus and pricing is correct or up to date.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. We have taken all reasonable steps to prevent Internet fraud and ensure any data collected from you is stored as securely and safely as possible.\n" +
    "    However, we cannot be held liable in the extremely unlikely event of a breach in our secure computer servers or those of third parties.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. The services &amp; products offered and sold by us on this website are provided for private domestic and consumer use only. Accordingly, we do not\n" +
    "    accept liability for any indirect loss, consequential loss, loss of data, loss of income or profit, loss of damage to property and/or loss from claims of\n" +
    "    third parties arising out of the use of the Website or for any products or services purchased from us.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. Users of this website are responsible for the security of their password used to register with this Website. Unless Zoop negligently discloses your\n" +
    "    password to a third party, Zoop will not be liable for any unauthorized transaction entered into using your name and password.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    O. <strong>LIABILITY</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. Zoop, and any of our group companies and the officers, directors, employees, shareholders or agents of any of them, exclude all liability and\n" +
    "    responsibility for any amount or kind of loss or damage that may result to you or a third party (including any direct, indirect, punitive or consequential\n" +
    "    loss or damages, or any loss of income, profits, goodwill, data, contracts, or loss or damages arising from or connected in any way to business\n" +
    "    interruption, loss of opportunity, loss of anticipated savings, wasted management or office time and whether in tort (including negligence), contract or\n" +
    "    otherwise, even if foreseeable) in connection with our services, this Website or in connection with the use, inability to use or the results of use of this\n" +
    "    Website, any websites linked to this Website or the material on these websites.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. Zoop takes full responsibility for the content of this Website and for the communication of orders to the Restaurants as set out in these Website Terms.\n" +
    "    Zoop's customer care team will, subject to your compliance with these Website Terms and cooperation, use all reasonable endeavours to resolve any issues\n" +
    "    arising from the submission of orders via this Website including the processing of all credit or debit card refunds and charge backs where appropriate.\n" +
    "    However, please note that the legal contract for the supply and purchase of food and beverages is between you and the Delivery Restaurants that you place\n" +
    "    your order with. Zoop cannot give any undertaking that the food and beverages ordered from the Delivery Restaurants through this Website will be of\n" +
    "    satisfactory quality and any such warranties are disclaimed by Zoop. These disclaimers do not affect your statutory rights against the Delivery\n" +
    "    Restaurants.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. Nothing in these Website Terms excludes or limits our liability for death or personal injury arising from Zoop's negligence, nor Zoop's liability for\n" +
    "    fraudulent misrepresentation, nor any other liability which cannot be excluded or limited under applicable law. Nothing in these Website Terms affects your\n" +
    "    statutory rights.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. With the exception of any liability referred to in paragraph (O) (3) above, Zoop's total liability to you in relation to your use of the Website and the\n" +
    "    services that we provide including (but not limited) to liability for breach of these Website Terms and tort (including but not limited to negligence) is\n" +
    "    limited to an amount equivalent to twice the value of your order or five thousand Indian rupees, whichever is the lower.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. Users of this website assume all associated costs If your use of material on this Website results in the need for servicing, repair or correction of\n" +
    "    equipment.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    P. <strong>LIABILITY</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. <strong> </strong>These Website Terms shall be governed by and construed in accordance with the laws of India subject to the provisions of the\n" +
    "    Arbitration Clause. The courts in New Delhi shall have exclusive jurisdiction in connection with any dispute arising in connection with these Website Terms\n" +
    "    (including non-contractual disputes) to the conclusion of all other courts. All dealings, correspondence and contacts between us shall be made or conducted\n" +
    "    in the English language.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    Q. <strong>ALTERNATE DISPUTE RESOLUTION</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. Any dispute, difference arising out of or incidental to with these Website Terms (including non-contractual disputes) shall be first be attempt to be\n" +
    "    settled amicably by the parties through negotiations, failing which the same shall be referred to arbitration at New Delhi to sole arbitrator appointed by\n" +
    "    the Dealer and this clause will be deemed to submitted to arbitration and all proceeding shall be subject to the provisions of the Arbitration &amp;\n" +
    "    Conciliation Act 1996 and any statutory modification thereof for the time being enforced.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. The principle language in all such proceeding and the daily transcript shall be in English. Any decision and reward resulting from arbitration\n" +
    "    proceeding shall be final and binding on both the parties.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. The fee of arbitrator and other common expense incurred for running the arbitration proceeding shall be borne by both the parties equally.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. The arbitrator may provide in the arbitral award for the reimbursement to the prevailing party of its costs and expenses in bringing or defending the\n" +
    "    arbitration claim, including legal fees and expenses incurred by such party. Pending the submission of and/ or decision on a dispute, difference or claim,\n" +
    "    the parties shall continue to perform all of their obligation under this agreement without prejudice to the final adjustment in accordance with the award\n" +
    "    passed in arbitration proceeding. in bringing or defending\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    R. <strong>ADDITIONAL TERMS</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. We take utmost care in protecting our users privacy and security. All personal data that we collect from you will be processed in accordance with our\n" +
    "    Privacy Policy. You should review our Privacy Policy, which is available on this website for your reference.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. In the event where any provision or part of a provision of these Website Terms is found by any court or authority of competent jurisdiction to be\n" +
    "    unlawful, otherwise invalid or unenforceable, such provisions or part provisions will be struck out of these Website Terms and the remainder of these\n" +
    "    Website Terms will apply as if the offending provision or part provision had never been agreed.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. Any failure or delay by users or us in enforcing (in whole or in part) any provision of these Website Terms will not be interpreted as a waiver of your\n" +
    "    or our rights or remedies.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    4. You may not transfer any of your rights or obligations under these Website Terms without our prior written consent. We may transfer any of our rights or\n" +
    "    obligations under these Website Terms without your prior written consent to any business that we enter into a joint venture with, purchase or are sold to.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    5. The headings in these Website Terms are included for convenience only and shall not affect their interpretation.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    S. <strong>FORCE MAJURE</strong><strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    <strong></strong>\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    1. Zoop will not be liable or responsible for any failure to perform, or delay in performance of, any of our obligations under a contract that is caused by\n" +
    "    events outside our reasonable control (Force Majeure Event).\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    2. A Force Majeure Event includes any act, event, non-happening, omission or accident beyond our reasonable control and includes in particular (without\n" +
    "    limitation) the following:\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    a. strikes, lock-outs or other industrial action,\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    b. impossibility of the use of public or private telecommunications networks\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    c. civil commotion, riot, invasion, terrorist attack or threat of terrorist attack, war (whether declared or not) or threat or preparation for war,\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    d. fire, explosion, storm, flood, earthquake, subsidence, epidemic or other natural disaster,\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    e. the acts, decrees, legislation, regulations or restrictions of any government.\n" +
    "</p>\n" +
    "<p align=\"justify\">\n" +
    "    3. Our performance under any contract is deemed to be suspended for the period that the Force Majeure Event continues, and we will have an extension of\n" +
    "    time for performance for the duration of that period. We will use our reasonable endeavours to bring the Force Majeure Event to a close or to find a\n" +
    "    solution by which our obligations under the contract may be performed despite the Force Majeure Event.\n" +
    "</p>"