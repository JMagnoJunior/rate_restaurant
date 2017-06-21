/**
 * This is used by the component ListAvaliations
 *
 * @author Magno Jr <is.magnojr@gmail.com>
 */

import React from "react"

export default class Avaliation extends React.Component {
	constructor() {
        super();
    }

    render(){
        return(
            <div class="row border">
                <div class="col-md-10"> {this.props.comment} </div> <div class="col-md-2">{this.props.stars} </div>
            </div>
        );
    }
}