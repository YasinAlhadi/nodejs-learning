const getData = async (endp) => {
    const res = await fetch(`https://api.publicapis.org/${endp}`);
    const data = res.json();
    console.log(data);
}


getData("random");