
//eight payment window between 10/17 and 10/27
const amounts_matrix = [460.27,13431.88,18731.90,79043.94,8544.00,6785.24,16142.61,10248.00]



//this is the series of payments identified as occurring during the week prior to the payout, and adding up to suspiciously close to $130,000.00
const stormy_array = [13431.88, 18731.9, 79043.94, 8544, 10248]


total_permutations = 0
total_hits = 0
target = 130000
target_range = 1
low_threshold = target - target_range
high_threshold = target + target_range
range_window = 8
batch_min = 1
batch_max = 8


for(x = 0; x < amounts_matrix.length-(range_window-1); x++){
    amounts = amounts_matrix.slice(x, x + range_window)

    for(batch_size = batch_min; batch_size <= batch_max; batch_size++){

        const positions = Array.from({length: batch_size}, (_, i) => i);
        //calculate the upper thresholds for each position
        var position_thresholds = new Array(batch_size)
        for(i = 0; i < positions.length; i++){
            position_thresholds[i] = i + amounts.length - positions.length
        }   

        var position = positions[positions.length-1];

        while(positions[0] <= position_thresholds[position]){
            stormy_loop(positions, position)
        }

    }
}


console.log("overall total hits = " + total_hits)
console.log("overall total permutations = " + total_permutations)






function stormy_loop(positions, position){
    if(positions[position] <= position_thresholds[position]){
        totalcheck(positions)
        positions[position] += 1;
    }
    else{
        while(positions[position] > position_thresholds[position]){
            position -= 1
            positions[position] += 1;
        }
        cascade(positions,position)   
    }
}

function cascade(positions,position){
    base = positions[position]
    for(i = position + 1; i < positions.length; i++){
        position += 1
        base += 1
        positions[position] = base;
    }
}


function totalcheck(array){ 

    total_permutations += 1;
    output_array = []

    sum_amount = 0
    for(z = 0; z < array.length; z++){
        sum_amount += amounts[array[z]]
        output_array.push(amounts[array[z]])
    }
	
	//console.log(array)
	console.log(sum_amount.toFixed(2))
	

	/*
	if(sum_amount > low_threshold && sum_amount < high_threshold){
		
		//I know this is not an efficient way to compare arrays, but for these purposes it's fine
		if(output_array.toString() == stormy_array.toString()){
			console.log("STORMY PAYMENT DUPLICATE")
			console.log(output_array)
		}
		else{
			total_hits += 1
			console.log(output_array)
			console.log(sum_amount.toFixed(2))
			console.log("total hits = " + total_hits)
			console.log("total permutations = " + total_permutations)
			console.log("---------------")
		}
	}
	*/

}