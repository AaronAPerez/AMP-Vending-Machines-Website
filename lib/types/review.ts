export interface BusinessInfo {
  name: string;
  legalName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email: string;
  website: string;
  logo: string;
  socialMedia?: {
    facebook?: string;
    linkedin?: string;
  };
}

export interface ReviewEmailData {
  customerName: string;
  serviceType: string;
  serviceDate: string;
  machineModel?: string;
  reviewUrl?: string;
}

export interface ReviewCustomer {
  name: string;
  email: string;
  serviceDate: string;
  serviceType: string;
}