
//data taken from Trump campaign disbursements as compiled by Susan Simpson - https://t.co/fS0LJ4o5Ke - chronological order preserved
const amounts_matrix = [1380.54,9583.33,37993.04,3240.96,9583.33,814.24,6000.00,9000.00,15000.00,516.39,9583.33,25874.17,6000.00,9000.00,15000.00,9.00,9.00,35457.50,25.12,14.46,1483.00,6.80,702.24,6000.00,9000.00,15000.00,286.73,5.82,35457.50,14.00,10.41,15.51,6.64,335.59,4.42,9.78,94.46,35457.50,6000.00,18.35,6.88,9000.00,15000.00,10.21,4.73,15.22,10.02,10.02,100.00,174.04,8.64,11.39,21.07,8.71,20.40,6000.00,9000.00,15000.00,15.00,10.64,13.83,18.72,35457.50,6.80,44.49,15.96,31.66,6000.00,9000.00,35457.50,15000.00,3000.00,6000.00,9000.00,15000.00,3000.00,35457.50,810.24,5000.00,240.00,25927.19,35457.50,6000.00,9000.00,15000.00,6000.00,9000.00,15000.00,2452.45,35457.50,399.73,1844.20,1053.00,1000.00,35457.50,6000.00,9000.00,15000.00,8366.14,1000.00,35457.50,6000.00,9000.00,15000.00,1287.92,983.68,7890.44,2650.66,423371.70,29715.42,35845.00,125080.31,3085.50,2937.50,72800.00,6000.00,9000.00,15000.00,428.53,1000.00,110684.17,671.11,398.53,21330.00,9000.00,9000.00,1168.54,3549.71,538.73,1000.00,169758.33,1936.98,216.00,306.67,428.53,3596.01,8656.00,48239.77,3.27,9000.00,9000.00,169758.33,927.37,927.37,927.37,601.44,899.36,3127.32,384.12,1152.36,7635.69,1162.16,15127.28,3986.75,430.51,4275.00,2066.44,2882.76,9000.00,9000.00,376.20,376.20,74.45,868.00,2000.00,231.98,169758.33,9480.50,417.55,1202.25,801.50,1202.25,400.75,533.45,7173.60,1127.03,2419.08,458.77,1242.76,1021.43,2172.45,956.26,925.11,9000.00,9000.00,458.77,1020.80,234.00,1000.00,169758.33,6039.88,3984.88,1343.00,460.27,13431.88,18731.90,79043.94,8544.00,6785.24,16142.61,10248.00,3234.15,956.08,1473.40,524.70,524.70,31820.97,9587.47,226.84,14314.42,11600.00,1000.00,169758.33,9000.00,9000.00,4099.20,9245.93,683.04,626.99,21141.28,11541.20,224.53,4611.60,12265.61,1394.62,3347.22,6850.44,4275.00,11541.20,24147.40,2459.52,7896.35,18584.97,139616.00,479.91,49276.57,283500.00,7776.17,11634.53,3647.35,29791.99,130888.33]


//separate data set where all recurring rent payments, round numbers (15k, 9k, 5k, etc.), and transactions < 1000.00 have been removed.
const xamounts_matrix = [1380.54,9583.33,37993.04,3240.96,9583.33,9583.33,25874.17,1483,25927.19,2452.45,1844.2,1053,8366.14,1287.92,7890.44,2650.66,29715.42,35845,125080.31,3085.5,2937.5,72800,110684.17,21330,1168.54,3549.71,1936.98,3596.01,8656,48239.77,3127.32,1152.36,7635.69,1162.16,15127.28,3986.75,4275,2066.44,2882.76,2000,9480.5,1202.25,1202.25,7173.6,1127.03,2419.08,1242.76,1021.43,2172.45,1020.8,6039.88,3984.88,1343,13431.88,18731.9,79043.94,8544,6785.24,16142.61,10248,3234.15,1473.4,31820.97,9587.47,14314.42,11600,4099.2,9245.93,21141.28,11541.2,4611.6,12265.61,1394.62,3347.22,6850.44,4275,11541.2,24147.4,2459.52,7896.35,18584.97,49276.57,7776.17,11634.53,3647.35,29791.99,130888.33]


//this is the series of payments identified as occurring during the week prior to the payout, and adding up to suspiciously close to $130,000.00
const stormy_array = [13431.88, 18731.9, 79043.94, 8544, 10248]


total_permutations = 0
total_hits = 0
target = 130000
target_range = 1
low_threshold = target - target_range
high_threshold = target + target_range
range_window = 12
batch_min = 1
batch_max = 12


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

	if(sum_amount > low_threshold && sum_amount < high_threshold){
		
		//I know this is not an efficient way to compare arrays, but for these purposes it's fine
		if(output_array.toString() == stormy_array.toString()){
			console.log("STORMY PAYMENT DUPLICATE")
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

}