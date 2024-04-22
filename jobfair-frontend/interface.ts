  interface CompanyItem {
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
  
  interface CompanyJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CompanyItem[]
  }

  interface ReviewItem {
    _id: string,
    rating: number,
    comment: string,
    user: User,
    company: CompanyItem,
    createdAt: Date,
    __v: number
  }

  interface ReviewJson {
    success: boolean,
    count: number,
    data: ReviewItem[]
  }

  interface BookingItem{
    _id: string,
    interviewDate: string,
    user: string,
    name: string,
    company: CompanyItem,
    createdAt: Date,
    __v: number
  }

  interface BookingJson{
    success: boolean,
    count: number,
    data: BookingItem[];
  }

  interface User{
    _id: string,
    name: string,
    email: string,
    emailVerified: string,
    profile_picture: string,
    favouriteIds: CompanyItem[]
    tel: string,
    role: string,
    companyID:string,
    token: string,
    createdAt: string,
    updatedAt: string,
  }

  interface UserJSON{
    success: boolean,
    data: User
  }

  
