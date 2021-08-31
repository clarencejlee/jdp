from typing import List, Set

# market (0), retailer(1), department(2), category(3), brand(4), facts(5+)
from models import FactModel, MarketModel, CategoryModel, BrandModel, PeriodModel
from models.johnson_scanner_data import FactsInData, JohnsonScannerDataModel

MARKET_INDEX = 0
RETAILER_INDEX = 1
DEPARTMENT_INDEX = 2
CATEGORY_INDEX = 3
BRAND_INDEX = 4
PERIOD_INDEX = 5
FACT_START_INDEX = 6


def get_type_by_name(data: List, name:str, type: str) -> str:
    """
    Get parent type by name and type
    :param data:
    :param name:
    :param type:
    :return:
    """
    for i, n in enumerate(data):
        for h_i, h_data in enumerate(data[i]):
            if type == 'market' and h_i == MARKET_INDEX:
                if data[i][CATEGORY_INDEX] == name:
                    return h_data
            if type == 'category' and h_i == CATEGORY_INDEX:
                if data[i][BRAND_INDEX] == name:
                    return h_data


def parse_metadata_from_csv(data: List) -> [Set, Set, Set, Set, Set]:
    """
    Parse CSV file and extract metadata for fact, market, category, brand and period
    :param data: 
    :return: 
    """""
    market_data = set()
    category_data = set()
    brand_data = set()
    period_data = set()
    fact_data = set()
    for index, item in enumerate(data):
        if index == 0:
            for h_i, h_data in enumerate(data[index]):
                if h_i >= FACT_START_INDEX:
                    fact_data.add(h_data)
        else:
            for r_i, r_data in enumerate(data[index]):
                if r_i == MARKET_INDEX:
                    market_data.add(r_data)
                if r_i == CATEGORY_INDEX:
                    category_data.add(r_data)
                if r_i == BRAND_INDEX:
                    brand_data.add(r_data)
                if r_i == PERIOD_INDEX:
                    period_data.add(r_data)

    return fact_data, market_data, category_data, brand_data, period_data


def parse_data_from_csv(data: List, fact_data: List[FactModel], market_data: List[MarketModel], category_data:
                        List[CategoryModel], brand_data: List[BrandModel],
                        period_data: List[PeriodModel]) -> List[JohnsonScannerDataModel]:
    """
    Parse csv and extract data
    :param data: 
    :param fact_data: 
    :param market_data: 
    :param category_data: 
    :param brand_data: 
    :param period_data: 
    :return: 
    """""
    result = []
    for index, item in enumerate(data):
        if index == 0:
            continue
        retailer, department, market_id, category_id, brand_id, period_id = None, None, None, None, None, None
        facts = []
        for r_i, r_data in enumerate(data[index]):
            if r_i == RETAILER_INDEX:
                retailer = r_data
            elif r_i == DEPARTMENT_INDEX:
                department = r_data
            elif r_i == MARKET_INDEX:
                market_id = [x for x in market_data if x.name == r_data][0].id
            elif r_i == CATEGORY_INDEX:
                category_id = [x for x in category_data if x.name == r_data][0].id
            elif r_i == BRAND_INDEX:
                brand_id = [x for x in brand_data if x.name == r_data][0].id
            elif r_i == PERIOD_INDEX:
                period_id = [x for x in period_data if x.name == r_data][0].id
            elif r_i >= FACT_START_INDEX:
                fact = [x for x in fact_data if x.name == data[0][r_i]][0]
                facts.append(FactsInData(fact_id=fact.id, value=r_data))

        jsd = JohnsonScannerDataModel(retailer=retailer,
                                      department=department,
                                      market_id=market_id,
                                      category_id=category_id,
                                      brand_id=brand_id,
                                      period_id=period_id,
                                      facts=facts)
        result.append(jsd)

    return result
