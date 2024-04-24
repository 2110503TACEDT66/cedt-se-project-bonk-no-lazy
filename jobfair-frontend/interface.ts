  export interface CompanyItem {
    _id: string,
    name: string,
    address: string,
    website:string,
    description:string,
    tel: string,
    quote:string,
    picture: string,
    __v: number,
    id: string,
  }
  
  export interface CompanyJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CompanyItem[]
  }

  export interface ReviewItem {
    _id: string,
    rating: number,
    comment: string,
    user: user,
    company: CompanyItem,
    createdAt: Date,
    __v: number
  }

  export interface ReviewJson {
    success: boolean,
    count: number,
    data: ReviewItem[]
  }

  export interface BookingItem{
    _id: string,
    interviewDate: string,
    user: string,
    name: string,
    company: CompanyItem,
    createdAt: Date,
    __v: number
  }

  export interface BookingJson{
    success: boolean,
    count: number,
    data: BookingItem[];
  }

  export interface user{
    _id: string,
    name: string,
    tel: string,
    role: string,
    email: string,
    emailVerified: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    favouriteIds: CompanyItem[],
    companyID:string,
  }

  export interface userJSON{
    success: boolean,
    data: User
  }

  
