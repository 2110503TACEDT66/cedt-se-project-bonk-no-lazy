import axios from "axios";
import { CompanyJson, CompanyItem } from "../../../interface";

export default async function CompanyItem(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    // สร้าง query object เพื่อใช้ในการค้นหาข้อมูลจากฐานข้อมูลหรือ API
    let query: any = {};

    // ถ้ามี userId ที่ระบุเข้ามา ให้เพิ่ม property ของ userId เข้าไปใน query object
    if (userId) {
      query.userId = userId;
    }

    // ถ้ามี category ที่ระบุเข้ามา ให้เพิ่ม property ของ category เข้าไปใน query object
    if (category) {
      query.category = category;
    }

    // ถ้ามี roomCount ที่ระบุเข้ามา ให้เพิ่ม property ของ roomCount เข้าไปใน query object โดยมีเงื่อนไขที่ค่าต้องมากกว่าหรือเท่ากับค่าที่ระบุ
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    // ถ้ามี guestCount ที่ระบุเข้ามา ให้เพิ่ม property ของ guestCount เข้าไปใน query object โดยมีเงื่อนไขที่ค่าต้องมากกว่าหรือเท่ากับค่าที่ระบุ
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    // ถ้ามี bathroomCount ที่ระบุเข้ามา ให้เพิ่ม property ของ bathroomCount เข้าไปใน query object โดยมีเงื่อนไขที่ค่าต้องมากกว่าหรือเท่ากับค่าที่ระบุ
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    // ถ้ามี locationValue ที่ระบุเข้ามา ให้เพิ่ม property ของ locationValue เข้าไปใน query object
    if (locationValue) {
      query.locationValue = locationValue;
    }

    // ถ้ามี startDate และ endDate ที่ระบุเข้ามา ให้เพิ่มเงื่อนไขที่ไม่ใช่ (NOT) เข้าไปใน query object เพื่อค้นหาข้อมูลที่ไม่ตรงกับการจองระหว่างช่วงเวลาที่กำหนด
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    // Make a GET request to your backend API
    const response = await axios.get<CompanyItem[]>("/api/listings", {
      params: query,
    });

    // Extract data from the response
    const listings: CompanyItem[] = response.data;

    // Optionally manipulate the data if needed

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
