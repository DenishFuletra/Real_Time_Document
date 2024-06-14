export enum ResponseMessages {
    ServerError = 'Server Error.',
    Login_Success = 'Login successfully.',
    Token_Generated = 'Token generated successfully.',
    Token_Not_Generated = 'Automatically Logout. Please Login again.',
    Invalid_Credentials = 'Please enter the correct ID - Password',
    User_Not_Exist = 'Phone number does not exist in our system.Please register yourself within 10 seconds',
    Token_Expired = 'Your Token has been Expired. Please Generate New Token.',
    Refresh_Expired_Token = 'Refresh Token Expired.',
    Users_Not_Found = 'User not exist in the system',
    Token_Invalid = 'Token Invalid.',
    Invalid_id = 'Please provide a valid ID',
    Document_Created = 'Document created Successfully',
    Document_Found = 'Document found Successfully',
    Document_Not_Exist = 'Document not exist in the system.',
    Document_Updated = 'Document updated Successfully',
    Document_Deleted = 'Document deleted Successfully'
}
