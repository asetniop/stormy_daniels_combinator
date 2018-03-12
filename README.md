# stormy_daniels_combinator

Just a basic script to calculate the odds that a series of payouts from the Trump Campaign to the Trump Organization that added up to close to $130k could have happened randomly.

Make any desired changes to your variables, save, and then run in js.node.



---

Some further details: Last week, D.C. attorney Susan Simpson noticed something very interesting about a series of payments from the Trump presidential campaign to the Trump Organization.  On October 17, 2016, Michael Cohen formed Essential Consultants, LLC, for the sole purpose of paying Stormy Daniels a total of $130,000.00 by October 27, 2016.  Between the dates of October 17 and October 25, the campaign made a series of eight disbursements.  Five of those eight disbursements added up to a total of $129,999.72.  

A number of people exhibited skepticism, accusing Simpson of having "cherry picked" the data to obtain the a preordained result.  So I wanted to take a look and see if this was indeed the case; if it was possible to "cherry pick" a random set of these disbursements and add them together to come up with a similar value.

Here's the set of data that Susan was working with to get the total she found suspicious: 

1. 10/17/2016 0:00	TRUMP INTERNATIONAL HOTEL				NY	$460.27 	TRAVEL: LODGING [AMEX: SB23.2859906]
2. 10/17/2016 0:00	TRUMP INTERNATIONAL HOTEL				DC	$13,431.88 	FACILITY RENTAL/CATERING SERVICES
3. 10/17/2016 0:00	TRUMP INTERNATIONAL HOTEL LAS VEGAS		NV	$18,731.90 	TRAVEL: LODGING [AMEX: SB23.2859911]
4. 10/17/2016 0:00	TRUMP INTERNATIONAL HOTEL LAS VEGAS		NV	$79,043.94 	TRAVEL: LODGING
5. 10/17/2016 0:00	TRUMP NATIONAL GOLF CLUB WASHINGTON DC	VA	$8,544.00 	FACILITY RENTAL/CATERING SERVICES
6. 10/21/2016 0:00	DORAL GOLF RESORT						FL	$6,785.24 	TRAVEL: LODGING [AMEX SB23.2859923
7. 10/25/2016 0:00	TRUMP INTERNATIONAL HOTEL				NV	$16,142.61 	TRAVEL: LODGING [AMEX: SB23.2859906]
8. 10/25/2016 0:00	TRUMP INTERNATIONAL HOTEL				NY	$10,248.00 	TRAVEL: LODGING [AMEX: SB23.2859906]

The total of $129,999.72 is obtained by adding up 2, 3, 4, 5, and 8.  

This script breaks the total data set of payments (taken from the excel file and built into an array) into chronological windows specified by the range_window variable (i.e. range_window = 12 will build an array of 12 sequential payments).

Each window is then scanned via the combinator to determine all possible combinations with the minimum and maximum batch size.  Each combination is summed, and checked to see whether it meets the criteria (default is within $1 of $130,000.00) and is distinct from the originally identified combination.  If so, it is counted and displayed.














