import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import {client,sender } from "./mailtrap"

export const sendVerificationEmail= async(email:string,verificationToken:string)=>{
    const recipient=[{email}];
    try {
        const res= await client.send({
            from:sender,
            to:recipient,
            subject:"verify your email",
            html:htmlContent.replace("{verificationToken}",verificationToken),
            category:"Email verification"
        })
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send Verification code");
    }
}
export const sendwelcomeEmail= async (email:string,name:string)=>{
    const recipient=[{email}];
    const htmlContent=generateWelcomeEmailHtml(name);
    try {
        const res= await client.send({
            from:sender,
            to:recipient,
            subject:"welcome to Rs restaurent",
            html:htmlContent,
            template_variables:{
             company_info_name:"Rs Restaurent",
             name:name
            }

        })
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email");
    }
}


export const sendPasswordResetEmail= async (email:string,resetURL:string)=>{
    const recipient=[{email}];
    const htmlContent=generatePasswordResetEmailHtml(resetURL);
    try {
        const res= await client.send({
            from:sender,
            to:recipient,
            subject:"Reset your password",
            html:htmlContent,
           category:"Reset password"

        })
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email");
    }
}

export const sendResetSuccessEmail= async (email:string)=>{
    const recipient=[{email}];
    const htmlContent=generateResetSuccessEmailHtml();
    try {
        const res= await client.send({
            from:sender,
            to:recipient,
            subject:"password reset successfully",
            html:htmlContent,
           category:"Reset password"

        })
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send reset success email");
    }
}


