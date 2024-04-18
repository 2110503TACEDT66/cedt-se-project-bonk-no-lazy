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
    user: user,
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

  interface user{
    _id: string,
    name: string,
    tel: string,
    email: string,
    role: string,
    profile_picture: string,
    createdAt: string,
    token: string,
    companyID:string
  }

  interface userJSON{
    success: boolean,
    data: user
  }

  
