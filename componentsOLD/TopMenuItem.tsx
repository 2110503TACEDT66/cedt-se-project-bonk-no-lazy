import Link from "next/link";
import style from '@/components/topmenu.module.css'

export default function TopMenuItem({title,pageRef} :{title:string,
    pageRef:string}){
    return(
        <Link href={pageRef} className={style.itemcontainer}>
            {title}
        </Link>
    );
}