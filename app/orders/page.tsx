

import { redirect } from 'next/navigation';
import { auth } from '../_lib/auth';
import { headers } from 'next/headers';

const Orders = async () => {

     const session = await auth.api.getSession({
        headers: Object.fromEntries((await headers()).entries()),
      });


    if (!session) {
        return redirect("/")
    }
  return (  
    <div> Orders</div>
  )
}

export default Orders