import React from 'react';
import "./stripecard.css"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";


function Stripecard(props) {


    return (
        <Card className="w-96">
            <CardHeader floated={false} className="h-80">
                {props.img ? <img className='imagen' src={props.img} alt="NOIMG" /> : null}
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {props.name ? <h1 className='titulo'>{props.name}</h1> : null} ({props.cantidad} )
                </Typography>
                <Typography color="blue" className="font-medium" textGradient>
                    {props.price ? <p className='precio'>${props.price * props.cantidadnum}</p> : null}
                </Typography>
            </CardBody>
        </Card>
        // <div className='card'>
        //     <div>
        //         {props.name ? <h1 className='titulo'>{props.name}</h1> : null}
        //         {props.img ? <img className='imagen' src={props.img} alt="NOIMG" /> : null}
        //     </div>
        //     {props.price ? <p className='precio'>{props.price}</p> : null}
        // </div>
    );
}

export default Stripecard;